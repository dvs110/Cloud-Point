import express from "express"
import dotenv from "dotenv"
import path from "path"
dotenv.config();
import https from "https"
const app = express()

const port = process.env.PORT || 4000;
app.use(express.urlencoded({ extended: false }))


app.use(express.json());
// app.use(express.static(path.join(__dirname + "/public")))



app.post("/form", function (req, res) {
    const query = req.body.city;
    // console.log(query);
    // const apikey = "32058cbab987f2fa4297ba164086b15f";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + process.env.WEATHER_API
    // const url = "https://api.openweathermap.org/data/2.5/weather?q=Dehradun&appid=32058cbab987f2fa4297ba164086b15f"
    const getcurrday = () => {
        const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let currentTime = new Date()
        let day = weekday[currentTime.getDay()]
        return day

    }
    const getcurrentTime = () => {
        var months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
        var now = new Date()
        var month = months[now.getMonth()]
        var date = now.getDate()

        let hours = now.getHours()
        let mins = now.getMinutes()
        let period = "AM";
        if (hours > 11)
            period = "PM"
        if (hours > 12)
            hours -= 12

        if (mins < 10) {
            mins = "0" + mins
        }
        return `${month} ${date} | ${hours}:${mins} ${period}`
    }
    let currDate = getcurrday() + " | " + getcurrentTime()
    // console.log(currDate);
    https.get(url, function (response) {
        console.log(response.statusCode);
        response.on("data", function (data) {
            const weatherdata = JSON.parse(data)
            const temp = weatherdata.main.temp;
            const name = weatherdata.name
            // console.log(name);
            let ob = {
                t: temp,
                n: name,
                c: currDate
            }
            console.log(ob);
            res.status(200).json(ob)

        })

    })

})






app.listen(port, function (err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", port);
})
