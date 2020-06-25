window.c = console

prio = settings.cqpPrio or ['deprel', 'pos', 'msd', 'suffix', 'prefix', 'grundform', 'lemgram', 'saldo', 'word']


parseDateInterval = (op, val, expanded_format) ->
    val = _.invokeMap val, "toString"
    unless expanded_format
        return "$date_interval #{op} '#{val.join(",")}'"

    [fromdate, todate, fromtime, totime] = val

    m_from = moment(fromdate, "YYYYMMDD")
    m_to = moment(todate, "YYYYMMDD")

    fieldMapping =
        text_datefrom : fromdate
        text_dateto : todate
        text_timefrom : fromtime
        text_timeto : totime

    op = (field, operator, valfield) ->
        val = if valfield then fieldMapping[valfield] else fieldMapping[field]
        "int(_.#{field}) #{operator} #{val}"


    days_diff = m_from.diff(m_to, "days")
    c.log "days_diff", days_diff

    if days_diff == 0  # same day
        out = "#{op('text_datefrom', '=')} &
        #{op('text_timefrom', '>=')} &
        #{op('text_dateto', '=')} &
        #{op('text_timeto', '<=')}"

    else if days_diff == -1 # one day apart
        out = "((#{op('text_datefrom', '=')} & #{op('text_timefrom', '>=')}) | #{op('text_datefrom', '=', 'text_dateto')}) &
        (#{op('text_dateto', '=', 'text_datefrom')} | (#{op('text_dateto', '=')} & #{op('text_timeto', '<=')}))"


    else
        out = "((#{op('text_datefrom', '=')} & #{op('text_timefrom', '>=')}) |
        (#{op('text_datefrom', '>')} & #{op('text_datefrom', '<=', 'text_dateto')})) &
        (#{op('text_dateto', '<')} | (#{op('text_dateto', '=')} & #{op('text_timeto', '<=')}))"


    out = out.replace(/\s+/g, " ")

    unless fromdate and todate then out = ""

    return out

stringifyCqp = (cqp_obj, expanded_format = false) ->
    output = []
    cqp_obj = CQP.prioSort _.cloneDeep cqp_obj

    for token in cqp_obj
        if typeof token == "string"
            output.push token
            continue

        outer_and_array = []
        for and_array in token.and_block
            or_array = []
            for {type, op, val, flags} in and_array
                if expanded_format
                    [val, op] = {
                        "^=" : [val + ".*", "="]
                        "_=" : [".*" + val + ".*", "="]
                        "&=" : [".*" + val, "="]
                        "*=" : [val, "="]
                        "!*=" : [val, "!="]
                        "rank_contains": [val + ":.*", "contains"]
                        "not_rank_contains": [val + ":.*", "not contains"]
                        "highest_rank" : ["\\|" + val + ":.*", "="]
                        "not_highest_rank": ["\\|" + val + ":.*", "!="]
                    }[op] or [val, op]

                flagstr = ""
                if flags and _.keys(flags).length and type != "date_interval"
                    flagstr = " %" + _.keys(flags).join("")

                if type == "word" and val == ""
                    out = ""
                else if type == "date_interval"
                    out = parseDateInterval(op, val, expanded_format)

                else
                    out = "#{type} #{op} \"#{val}\""

                if out
                    or_array.push(out + flagstr)
            if not _.isEmpty or_array
                outer_and_array.push or_array

        or_out = for x in outer_and_array
            if x.length > 1
                "(#{x.join(' | ')})"
            else
                x.join(' | ')

        if token.bound
            or_out = _.compact or_out
            for bound in _.keys (token.bound)
                or_out.push "#{bound}(sentence)"



        out_token = "[#{or_out.join(' & ')}]"
        if token.repeat
            out_token += "{#{token.repeat.join(',')}}"



        output.push out_token



    return output.join(" ")

window.CQP =

    parse : => CQPParser.parse arguments...

    stringify : stringifyCqp

    expandOperators : (cqpstr) ->
        CQP.stringify CQP.parse(cqpstr), true

    getTimeInterval : (obj) ->
        from = []
        to = []
        for token in obj
            for or_block in token.and_block
                for item in or_block
                    if item.type == "date_interval"
                        from.push moment("#{item.val[0]}#{item.val[2]}", "YYYYMMDDhhmmss")
                        to.push moment("#{item.val[1]}#{item.val[3]}", "YYYYMMDDhhmmss")

        unless from.length then return
        from = _.minBy from, (mom) -> mom.toDate()
        to = _.maxBy to, (mom) -> mom.toDate()

        return [from, to]

    prioSort : (cqpObjs) ->
        getPrio = (and_array) ->
            numbers = _.map and_array, (item) ->
                _.indexOf prio, item.type
            return Math.min numbers...

        for token in cqpObjs
            token.and_block = (_.sortBy token.and_block, getPrio).reverse()

        return cqpObjs

    # assume cqpObj2 to contain fewer tokens than cqpObj1
    mergeCqpExprs: (cqpObj1, cqpObj2) ->
        for token, i in cqpObj2
            cqpObj1[i].and_block = cqpObj1[i].and_block.concat token.and_block
        return cqpObj1
