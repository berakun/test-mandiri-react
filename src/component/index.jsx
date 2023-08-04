import React, { useState, useEffect } from 'react';
import { api } from '../plugin/axios.js'

function index() {

    const table_name = [
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Symbol', value: 'symbol' },
        { text: 'Rank', value: 'rank' },
        { text: 'Type', value: 'type' },
        { text: 'Active', value: 'is_active' }
    ]

    const [data, setData] = useState([])

    async function loadData() {
        const response = await api.get('/v1/coins/');
        const data = await response.data.data;
        setData(data);
    }

    useEffect(() => {
        loadData();
    }, []);

    const [searchValue, setSearchValue] = useState('')

    const filteredData = filterData(data, searchValue);
    function filterData(data, searchValue) {
        return data.filter((data) =>
            data.title.toLowerCase().includes(searchValue.toLowerCase())
        );
    }

    return (
        <div className="text-black bg-slate-200 h-screen mx-auto">
            <div className="overflow-x-auto pt-4">
                <input className='border border-spacing-3 rounded' placeholder='  Search...' onInput={(event) => { setSearchValue(event.target.value) }} value={searchValue} />
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-900 uppercase bg-gray-100">
                        <tr>
                            {table_name.map((name) => (
                                <th scope="col" className="px-6 py-3">
                                    {name.text}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* {filteredData.map((data, index) => ( */}
                        {filteredData.map((data) => (
                            <tr key={data.id} className="bg-white border-b text-gray-900">
                                <th scope="row" className="px-6 py-4">
                                    {data.id}
                                </th>
                                <td className="px-6 py-4">
                                    {data.name}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {data.symbol}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {data.rank}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {data.type}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {data.is_active}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default index