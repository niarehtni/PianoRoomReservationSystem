const Router = require("koa-router");
const router = new Router();
const dataBase = require("../dataBase");

function sortItem(a, b)
{
    if(a.date > b.date)
    {
        return 1;
    }
    else if(a.date < b.date)
    {
        return -1;
    }
    else
    {
        if(a.begTimeIndex > b.begTimeIndex)
        {
            return 1;
        }
        else if(a.begTimeIndex < b.begTimeIndex)
        {
            return -1;
        }
        else
            return 0;
    }
}

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
                    let dateStr = date.getFullYear().toString() + "年" + (date.getMonth()+1).toString() + "月" + date.getDate().toString() + "日";
                    let week = date.getDay();
                    const weekStr = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
                    let info = {
                        "pianoPlace":i.piano_room,
                        "pianoType": i.piano_type,
                        "pianoPrice": p.item_value,
                        "reservationType": p.item_member,
                        "reservationState": p.item_type,
                        "reservationId": p.item_id,
                        "date": dateStr,
                        "weekday": weekStr[week],
                        "begTimeIndex": p.item_begin,
                        "endTimeIndex": p.item_begin+p.item_duration
                    };
                    reservationList.push(info);
                    break;
                }
            }
        }
        reservationList = reservationList.sort(sortItem);
        ctx.response.body = {"reservationList": reservationList};
    }
    console.log(ctx.response.body);
});

module.exports = routers;