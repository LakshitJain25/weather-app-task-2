import axios from "axios";
export default async function handler(req, res) {
   try{ const { key } = req.body
    const response = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=gDgrbkVquhG71osTOEworZfR9aUAEBo9&metric=true`)
    const { data } = response;
    res.status(200).json({ ...data })}
    catch(e){
        console.log("error",e)
    }

}