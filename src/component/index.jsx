import React, { useState, useEffect } from 'react';
import { api } from '../../plugins/useAxios'

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
        const response = await api.get('./post/books');
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
                        {filteredData.map((data, index) => (
                            <tr key={data.id} className="bg-white border-b text-gray-900">
                                <th scope="row" className="px-6 py-4">
                                    {/* Apple MacBook Pro 17" */}
                                    {data.id}
                                </th>
                                <td className="px-6 py-4">
                                    {/* Silver */}
                                    {data.name}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {/* Laptop */}
                                    {data.symbol}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {/* $2999 */}
                                    {data.rank}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {/* $2999 */}
                                    {data.type}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {/* $2999 */}
                                    {data.is_active}
                                </td>
                                {actionOpen && (
                                    <ul className="dropdown-menu pr-4 mt-10 pl-4 origin-top-right absolute py-1 right-4 w- rounded bg-white ring-2 ring-black ring-opacity-5">
                                        <li>
                                            <div>
                                                <button onClick={() => handleLogout(deleteId)} className='text-sm' type="button">Delete</button>
                                            </div>
                                        </li>
                                    </ul>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default index