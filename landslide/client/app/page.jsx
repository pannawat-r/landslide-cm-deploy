'use client'
import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Loading } from "@/components/loading";

import { Marker } from "react-leaflet"

export default function Home() {
  const [datetime, setDatetime] = useState()
  const [areaName, setAreaName] = useState([])
  const [rain1d, setRain1d] = useState([])
  const [rain5d, setRain5d] = useState([])
  const [lsRisk, setLsRisk] = useState([])

  const apiURL = process.env.NEXT_PUBLIC_API_URL

  const Map = useMemo(() => dynamic(
    () => import('@/components/map'),
    {
      loading: () => <div className="content-center h-[50rem] mx-auto"><Loading /></div>,
      ssr: false
    }
  ), [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiURL + '/home')
        setDatetime(response.data.datetime)
        setAreaName(response.data.area_name)
        setRain1d(response.data.rain_1d)
        setRain5d(response.data.rain_5d)
        setLsRisk(response.data.ls_risk)
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])


  const markerPositions = [
    [19.901635393640483, 99.0424094582897],
    [18.86555322762568, 99.34943132834088],
    [18.939043235127237, 98.81246711157635],
    [18.81638834589227, 98.89125771293459],
    [18.540612605384062, 98.52361195667108]
  ];

  return (
    <>
      {/* Header  */}
      <Header />


      {/* Main content */}
      <div className="container mx-auto">
        {/* Title */}
        <div className="py-5">
          <p className="text-center text-2xl">แผนที่ความเสี่ยงดินถล่มระดับชุมชน</p>
        </div>

        {/* Map */}
        <div className="flex justify-between p-3">
          <div className="w-full mr-3">
            <Map center={[18.788187932870155, 98.98523626490541]} zoom={8}>
              {({ TileLayer, Marker }) => (
                <>
                  <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  {markerPositions.map((position, index) => (
                    <Marker key={index} position={position} />
                  ))}

                </>
              )}
            </Map>
          </div>
          <div className="w-full h-1/2 ml-3 z-0">
            <select className="w-full mb-3">
              <option value={1}>อ่างขาง (ตำบลม่อนปิ่น อำเภอฝาง จังหวัดเชียงใหม่)</option>
              <option value={2}>แม่กำปอง (ตำบลห้วยแก้ว อำเภอแม่ออน จังหวัดเชียงใหม่)</option>
              <option value={3}>ม่อนแจ่ม (ตำบลแม่แรม อำเภอแม่ริม จังหวัดเชียงใหม่)</option>
              <option value={4}>ดอยสุเทพปุย (ตำบลสุเทพ อำเภอเมือง จังหวัดเชียงใหม่)</option>
              <option value={5}>ขุนกลาง (ตำบลบ้านหลวง อำเภอจอมทอง จังหวัดเชียงใหม่)</option>
            </select>
            <Map center={[18.788187932870155, 98.98523626490541]} zoom={10}>
              {({ TileLayer }) => (
                <>
                  <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                </>
              )}
            </Map>
          </div>
        </div>


        {/* Date time title */}
        <p className="text-center text-xl">ข้อมูลวันที่ {datetime}</p>

        {/* Table */}
        <table className="w-full table-auto my-3">
          <thead>
            <tr className="border-black border-b-2">
              <th className="p-3">พื้นที่</th>
              <th>น้ำฝนรายวันเวลา 7:00 น</th>
              <th>น้ำฝนสะสมราย 5 วัน</th>
              <th>ความเสี่ยงดินภล่ม</th>
            </tr>
          </thead>
          <tbody>
            {areaName.map((row, index) => (
              <tr key={index} className="border-b-2">
                <td className="text-center p-3">{row}</td>
                <td className="text-center p-3">{rain1d[index]} มม.</td>
                <td className="text-center p-3">{rain5d[index]} มม.</td>
                <td className="text-center p-3">{lsRisk[index] >= 0.5 ? lsRisk[index] * 100 + '%' : 'ไม่มี'}</td>

              </tr>
            ))}

          </tbody>
        </table>
      </div >

      {/* Footer */}
      < Footer />
    </>
  );
}
