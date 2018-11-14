const Router = require("koa-router");
const router = new Router();
const dataBase = require("../dataBase")

const routers = router.post("/all", async (ctx, next) => {
    let userId = ctx.request.body.number;
    let result = await dataBase.GetItem(userId);
    if(result.data === null)
    {
        ctx.response.body = {"reservationList": null, "errorMsg":result.info};
    }
    else
    {
        let reservationList = [];
        let pianoInfo = await dataBase.GetPianoRoomAll();
        for(let p of result.data) {
            for(let i of pianoInfo.data)
            {
                if(i.piano_id === p.item_roomId)
                {
                    let date = new Date(p.item_date);
                    console.log(date.toISOString());
                    let dateStr = date.getFullYear().toString() + "年" + date.getMonth().toString() + "月" + date.getDate().toString() + "日";
                    let info = {
                        "pianoPlace":i.pianoPlace,
                        "pianoType": i.pianoType,
                        "pianoPrice": p.item_value,
                        "reservationType": p.item_member,
                        "reservationState": p.item_type,
                        "date": dateStr,
                        "begTimeIndex": p.item_begin,
                        "endTimeIndex": p.item_begin+p.item_duration
                    };
                    reservationList.push(info);
                    break;
                }
            }
        }
        ctx.response.body = {"reservationList": reservationList};
    }
    console.log(ctx.response.body);
})

module.exports = routers;