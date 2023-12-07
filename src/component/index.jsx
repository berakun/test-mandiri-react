import { useState, useEffect } from 'react';
import { api } from '../plugin/axios.js'
import { Link } from 'react-router-dom';


function index() {

    const table_name = [
        { text: 'No', value: '' },
        { text: 'ID', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Symbol', value: 'symbol' },
        { text: 'Rank', value: 'rank' },
        { text: 'Type', value: 'type' }
        ]

    // Get Data
    const [data, setData] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [error, setError] = useState(null); // Menambahkan state untuk error


    async function loadData() {
        try{
            const response = await api.get('/v1/coins/', {});
            const data = response.data.slice(0, 100);
            // const data = await response.data.data;
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

    //Search code
    const filteredData = filterData(data, searchValue);

    function filterData(dataArray, searchValue) {
        return dataArray.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
        );
    }


    //Pagination

    const itemPerPage = 5; // Jumlah item per halaman
    const [currentPage, setCurrentPage] = useState(1);
  
    const totalPage = Math.ceil(filteredData.length / itemPerPage);

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPage));
    };
  
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;

  
    const visibleData = filteredData.slice(startIndex, endIndex);

    return (
        <div className="text-black bg-slate-200 h-screen mx-auto">
            <div className="overflow-x-auto pt-4 mx-8">
                <input className='border border-spacing-3 rounded mb-2 pl-1' placeholder='  Search...' onInput={(event) => { setSearchValue(event.target.value) }} value={searchValue} />
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
                        {visibleData.map((data, index) => (
                                <tr key={data.id} className="bg-white border-b text-gray-900">
                                    <td className="px-6 py-4">
                                        {index + 1}
                                    </td>
                                <th scope="row" className="px-6 py-4" type="button">
                                    <Link to={`/description/${data.id}`}>{data.name}</Link>
                                    {/* <Link to={`/description`}>{data.name}</Link> */}
                                    {data.id}
                                </th>
                                <td className="px-6 py-4">
                                    {data.name}
                                </td>
                                <td className="px-6 py-4">
                                    {data.symbol}
                                </td>
                                <td className="px-6 py-4">
                                    {data.rank}
                                </td>
                                <td className="px-6 py-4">
                                    {data.type}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-end mt-4">
                <button className="px-3 py-1" onClick={handlePrevPage}>
                     Prev
                </button>
                    {Array.from({ length: Math.min(totalPage) }).map((_, index) => {
                        const pageNumber = index + 1;
                        if (
                            pageNumber === 1 || // Menampilkan nomor awal
                            pageNumber === totalPage || // Menampilkan nomor akhir
                            (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1) // Menampilkan beberapa nomor di antara
                        ) {
                            return (
                                <button
                                    key={index}
                                    className={`px-3 py-1 mr-2 rounded ${
                                        currentPage === pageNumber ? 'bg-gray-600 text-white' : 'bg-gray-300'
                                    }`}
                                    onClick={() => setCurrentPage(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            );
                        }
                        return null;
                    })}
                <button className="px-3 py-1" onClick={handleNextPage}>
                    Next
                </button>
                    </div>
            </div>
        </div>
    )
}

export default index