const Router = require("koa-router");
const router = new Router();
const dataBase = require("../dataBase");


const routers = router.get("/all", async (ctx, next) => {
    let result = await dataBase.GetPianoRoomAll();
    if(result.data === null)
    {
        ctx.response.body = {
            "success": false,
            "pianoList": null,
            "info":result.info
        };
    }
    else
    {
        let pianolist = [];
        for(let p of result.data)
        {
            if(p.piano_status)
            {
                let timeList = [];
                for (let i = 0; i < p.piano_list.data.length; i++) {
                    if(p.piano_list.data[i] === "0" || p.piano_list.data[i] === 48)
                        timeList.push(0);
                    else
                        timeList.push(1);
                }
                let info = {
                    "pianoId": p.piano_id,
                    "pianoType": p.piano_type,
                    "timeTable": timeList,
                    "pianoPlace": p.piano_room
                };
                pianolist.push(info);
            }
        }
        ctx.response.body = {
            "success": true,
            "pianoList": pianolist
        };
    }
}).get("/detail", async (ctx, next) => {
    let pianoId = ctx.query.pianoId;
    let dateStr = ctx.query.date;
    dateStr.concat(" 08:00:00");
    let result = await dataBase.GetPianoRoomInfo(pianoId, dateStr);
    if(result.data === null)
    {
        ctx.response.body = {
            "success": false,
            "tableTime": null,
            "pianoPrices": null,
            "pianoInfo": null,
            "info":result.info
        };
    }
    else {
        let price = [
            result.data.piano_stuvalue,
            result.data.piano_teavalue,
            result.data.piano_socvalue,
            result.data.piano_multivalue
        ];
        ctx.response.body = {
            "success": true,
            "timeTable": result.data.piano_list,
            "pianoPrices": price,
            "pianoInfo": result.data.piano_info
        };
    }
});

module.exports = routers;