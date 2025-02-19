'use client'
import { useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import CMU from '@/public/logo/cmu.png'
import CENDIM from '@/public/logo/cendim.png'
import MSRI from '@/public/logo/msri.png'
import TSRI from '@/public/logo/tsri.png'

export default function Header() {
    const pathname = usePathname()

    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <>

            <nav className="flex justify-between shadow-md p-3">
                <div className="my-auto">
                    <a href='/' className="flex">
                        <Image src={CMU} className='mr-1' width={100} height={100} alt='CMU' />
                        <Image src={CENDIM} className='mx-1' width={100} height={100} alt='CENDIM' />
                        <Image src={MSRI} className='mx-1' width={70} height={100} alt='MSRI'/>
                        <Image src={TSRI} className='mx-1' width={70} height={100} alt='TSRI' />
                    </a>
                </div>
                <div className="text-center text-2xl my-auto w-1/3">โครงการพัฒนาระบบการสำรวจและบริหารจัดการพื้นที่เสี่ยงภัยน้ำท่วมและดินถล่ม บนพื้นฐานของเทคโนโลยีสารสนเทศและการจัดการขั้นสูง</div>
                <div className="my-auto">
                    <div className="flex justify-between ">
                        <a href="/" className={`hover:text-black" mr-1 ${pathname == '/' ? "text-black" : "text-gray-500"} `}>หน้าแรก</a>




                        <div className="relative inline-block mx-1">
                            <button type="button" className={`flex items-center hover:text-black ${pathname == '/angkhang' || pathname == '/maekampong' || pathname == '/monjam' || pathname == '/suthep' || pathname == '/khunklang' ? "text-black" : "text-gray-500"} `} onClick={toggleDropdown}>ติดตามสถานการณ์ดินถล่ม
                                <svg className="w-2.5 h-2.5 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>

                            {isOpen && (
                                <div className="origin-top-right absolute z-20 right-0 mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                    <ul role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                        <li>
                                            <a href="/angkhang" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeDropdown}>
                                                อ่างขาง
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/maekampong" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeDropdown}>
                                                แม่กำปอง
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/monjam" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeDropdown}>
                                                ม่อนแจ่ม
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/suthep" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeDropdown}>
                                                ดอยสุเทพปุย
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/khunklang" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={closeDropdown}>
                                                ขุนกลาง
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>



                        <a href="/history" className={`hover:text-black mx-1 ${pathname == '/history' ? "text-black" : "text-gray-500"} `}>ข้อมูลย้อนหลัง</a>
                        <a href="/about" className={`hover:text-black ml-1$ ${pathname == '/about' ? "text-black" : "text-gray-500"} `}>เกี่ยวกับโครงการ</a>
                    </div>
                </div>
            </nav >
        </>
    )
}