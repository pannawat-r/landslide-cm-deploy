'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/header"
import Footer from "@/components/footer";


export default function History() {
    const [areaName, setAreaName] = useState([])
    const [datetime, setDatetime] = useState([])
    const [rain5d, setRain5d] = useState([])
    const [lsRisk, setLsRisk] = useState([])
    const [filename, setFilename] = useState([])

    const apiURL = process.env.NEXT_PUBLIC_API_URL

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(apiURL + '/history')
                setAreaName(response.data.area_name)
                setDatetime(response.data.datetime)
                setRain5d(response.data.rain5d)
                setLsRisk(response.data.ls_risk)
                setFilename(response.data.filename)
            } catch (error) {
                console.log(error)
              }
            }
        
            fetchData()
          }, [])

    return (
        <>
            <Header />
            <div className="container mx-auto">
                <div className="ontent-center p-3"></div>
                <p className="text-center text-2xl">ข้อมูลย้อนหลัง</p>


                <table className="w-full table-auto my-3">
                    <thead>
                        <tr className="border-black border-b-2">
                            <th className="p-3">วันที่</th>
                            <th>พื้นที่</th>
                            <th>น้ำฝน</th>
                            <th>ความเสี่ยงดินภล่ม (สูงสุด)</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {areaName.map((row, index) => (
                            <tr key={index} className="border-b-2">
                                <td className="text-center p-3">{datetime[index]}</td>
                                <td className="text-center p-3">{row}</td>
                                <td className="text-center p-3">{rain5d[index]} มม.</td>
                                <td className="text-center p-3">{lsRisk[index]}%</td>
                                {console.log('Raw filename:', filename[index])}
                                <td><a href={`/history/${filename[index]}`} className="text-white bg-blue-500 hover:bg-blue-300 transition duration-150 p-2 rounded-lg">ดูข้อมูล</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Footer />
        </>
    )

}