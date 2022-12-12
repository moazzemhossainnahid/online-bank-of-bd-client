import axios from 'axios';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/Components.Nahid/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TransactionHistoryDetails from './TransactionHistoryDetails';


const TransactionHistory = () => {

    // const [paginatedData, set_paginatedData] = useState([]);
    // const [currentPage, set_currentPage] = useState(1);

    // const pageSize = 7;

    const transaction = () => axios.get('https://online-bank-of-bd-server-production.up.railway.app/statements');

    const { isLoading, data } = useQuery(["transaction"], transaction);

    const transactions = data && data?.data;

    // useEffect(() => {
    //     set_paginatedData(_(transactions).slice(0).take(pageSize).value(pageSize));
    // }, []);

    if (isLoading) {
        return <Loading />;
    }

    // console.log("From React Query", transactions)

    /* ----------------------------------------------------------------*/
    /*                  PAGINATION FUNCTIONALITY START                 */
    /* ----------------------------------------------------------------*/
    // const pageCount = transactions && Math.ceil(transactions.length / pageSize);

    // console.log(pageCount);
    // if (pageCount === 1) return null;
    // const pages = _.range(1, pageCount + 1);

    // const handlePagination = (pageno) => {
    //     set_currentPage(pageno);
    //     const startIndex = (pageno - 1) * pageSize;
    //     const paginateData = _(transactions).slice(startIndex).take(pageSize).value();
    //     set_paginatedData(paginateData);
    // };

    /* ----------------------------------------------------------------*/
    /*                  PAGINATION FUNCTIONALITY END                   */
    /* ----------------------------------------------------------------*/

    // console.log(paginatedData);

    return (
        <div className=" text-left h-full w-full">
            <p className="md:text-3xl text-xl font-bold leading-7 text-center text-gray-700">Total Transactions: {transactions?.length}</p>


            <div className="w-full flex items-center justify-center my-7">
                <div className=" shadow rounded py-12 px-8 mb-20">
                    <div className="w-full">
                        <div className="w-full mx-auto pb-16">
                            <div className="head bg-violet-800 w-full py-6 px-10 flex flex-col lg:flex-row gap-4 gap">
                                <div className="searchbar grow">
                                    <div className="form-control data-svelte-search">
                                        <svg
                                            className="text-base-content pointer-events-none absolute mt-3 ml-3 stroke-current opacity-60 "
                                            width="25"
                                            height="25"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                className="text-white"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="4"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            ></path>
                                        </svg>
                                        <input
                                            type="text"
                                            placeholder="Type to search..."
                                            className="input px-11 placeholder-slate-300 text-white bg-violet-700 hover:border-none border-none focus:ring-0 focus:ring-offset-0 text-md"
                                        />
                                    </div>
                                </div>
                                <div className="filteringBy-A-to-Z">
                                    <select className="select w-full max-w-xs input px-3 placeholder-white bg-violet-700 hover:border-none border-none focus:ring-0 focus:ring-offset-0 text-white text-md">
                                        <option disabled selected> Sort by: A-Z </option>
                                        <option>Name</option>
                                        <option>Date</option>
                                        <option>Type</option>
                                        <option>Lists</option>
                                        <option>Size</option>
                                    </select>
                                </div>
                                <div className="allStatus">
                                    <select className="select w-full max-w-xs px-3 placeholder-white bg-violet-700 hover:border-none border-none focus:ring-0 focus:ring-offset-0 text-white text-md">
                                        <option disabled selected> All Status </option>
                                        <option>Recently</option>
                                        <option>Last day</option>
                                        <option>Last week</option>
                                        <option>Last month</option>
                                        <option>Last year</option>
                                    </select>
                                </div>
                                <div className="recipients">
                                    <button className="input px-3 text-white placeholder-white bg-violet-700 hover:border-none border-none focus:ring-0 focus:ring-offset-0 text-white-50 text-md">
                                        <span className="font-bold text-md">
                                            <FontAwesomeIcon className="mr-4" icon={faPlus} />
                                        </span>
                                        New Recipients
                                    </button>
                                </div>
                            </div>

                            <div className="body">
                                <div className="overflow-x-auto w-full">
                                    <table className="table w-full">
                                        {/* head */}
                                        <thead>
                                            <tr>
                                                <th className="text-sm text-slate-500 bg-slate-100 py-8">Name / Business</th>
                                                <th className="text-sm text-slate-500 bg-slate-100 py-8">Last transfer date</th>
                                                <th className="text-sm text-slate-500 bg-slate-100 py-8">Last transfer amount</th>
                                                <th className="text-sm text-slate-500 bg-slate-100 py-8"> Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {
                                                transactions?.slice().reverse()
                                                    .map(trc => <TransactionHistoryDetails key={trc._id} trc={trc} />)
                                                // myTransactions?.reverse().map((trc) => <TransactionDetails key={trc._id} trc={trc} />)
                                            }

                                        </tbody>    {/* foot */}
                                        <tfoot>
                                            <tr>
                                                <th>Name</th>
                                                <th>Last Transfer Date</th>
                                                <th>Last Transfer Amount</th>
                                                <th>Action</th>
                                            </tr>
                                        </tfoot>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionHistory;