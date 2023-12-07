import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../plugin/axios.js'

function description() {

    const {id} = useParams(); // Mengambil id dari URL 

    const [data, setData] = useState([])
    const [error, setError] = useState(null); // Menambahkan state untuk error

    async function loadData() {
        try{
            const response = await api.get(`/v1/coins/${id}`);
            const data = await response.data;
            setData(data);
            setError(null); // Hapus pesan error jika permintaan berhasil
        } catch ( error ) {
            console.log("Terjadi kesalahan saat mengambil data."); // Set pesan error jika terjadi kesalahan
            setError("Terjadi kesalahan saat mengambil data.");
        }
    }
    useEffect(() => {
        loadData();
    }, []);

    console.log("data : ", data);

    return (
        <div className='relative pt-10'>
            <div className="w-full max-w-sm bg-white border border-black rounded shadow dark:border-gray-700 text-center content-center justify-center mx-auto pt-6">
                <div className="pb-5">
                    {/* {data.map((data) => ( */}
                        <div key={data.id}>
                            <div className="text-pl text-black dark:text-black text-left pl-6">Visual Designer : {data.id}</div>
                            <div className="text-pl text-black dark:text-black text-left pl-6">Visual Designer : {data.symbol}</div>
                            <div className="text-pl text-black dark:text-black text-left pl-6">Visual Designer : {data.name}</div>
                            </div>
                        {/* ))} */}
                    <div className="text-right mt-4 md:mt-6 pr-6">
                        <a href="/" className="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3">
                            Back
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default description