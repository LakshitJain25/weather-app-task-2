import axios from "axios";
export default async function handler(req, res) {
    const { location } = req.body
    const locationRes = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=gDgrbkVquhG71osTOEworZfR9aUAEBo9&q=${location}`)
    const locationData = locationRes.data;
    const key = locationData[0]["Key"]
    const response = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=gDgrbkVquhG71osTOEworZfR9aUAEBo9&metric=true`)
    const { data } = response;
    res.status(200).json({ ...data })
}