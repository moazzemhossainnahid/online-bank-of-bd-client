import React from 'react';
import PageTitle from '../../PageTitle/PageTitle';
const DepositDetails = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            {/* title */}

            <PageTitle title="Deposit"></PageTitle>

            {/* end */}


            {/* new-banner-start */}

            <div className='flex flex-col md:flex-row gap-2 justify-between items-center py-10 px-2'>

                <div data-aos="fade-down-right" data-aos-duration="1000" className="text-left">
                    <h3 className="text-3xl lg:text-5xl font-serif font-bold pb-4 lg:pb-8"><span className='text-primary'>Deposit </span>
                        Products</h3>
                    <p className='font-bold text-1xl'>Make small savings today to have a Bigger <br /> HAPPINESS TOMORROW</p>

                </div>

                <div data-aos="fade-down-left" data-aos-duration="1000">
                    <img className='object-cover' src="https://i.ibb.co/dMCN1FK/timedeposit-01-1.png" alt="deposit img" />
                </div>


            </div>

            {/* deposit details-start */}
            <div className='text-center'>

                <h3 className="text-3xl py-10">Term-deposit <span className='text-green-700 font-bold'>Products</span></h3>


            </div>

            <div data-aos="fade-up"
                data-aos-duration="2000" className="my-5 lg:px-15 lg:py-10 ">
                <table className="table w-full">
                    {/* <!-- head start --> */}
                    <thead >
                        <tr>
                            <th>SL.NO</th>
                            <th>Name</th>
                            <th>Time</th>
                            <th>PAYOUT</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        <tr>
                            <th>1</th>
                            <td>Monthly term deposit</td>
                            <td>Monthy</td>
                            <td>No</td>
                        </tr>

                        <tr>
                            <th>2</th>
                            <td>Term deposit </td>
                            <td>3 Months</td>
                            <td>No</td>
                        </tr>

                        <tr>
                            <th>3</th>
                            <td>Term deposit </td>
                            <td>6 Months</td>
                            <td>No</td>
                        </tr>
                        <tr>
                            <th>4</th>
                            <td>Term deposit </td>
                            <td>12 Months</td>
                            <td>No</td>
                        </tr>
                        <tr>
                            <th>5</th>
                            <td>Term deposit </td>
                            <td>6 Months</td>
                            <td>No</td>
                        </tr>
                        <tr>
                            <th>6</th>
                            <td>Term deposit </td>
                            <td>24 Months</td>
                            <td>No</td>
                        </tr>
                        <tr>
                            <th>7</th>
                            <td>Term deposit</td>
                            <td>24 Months</td>
                            <td>1 year </td>
                        </tr>
                        <tr>
                            <th>8</th>
                            <td>Term deposit </td>
                            <td>36 Months</td>
                            <td>No</td>
                        </tr>
                        <tr>
                            <th>9</th>
                            <td>Term deposit</td>
                            <td>36  Months</td>
                            <td>6 Month</td>
                        </tr>
                        <tr>
                            <th>10</th>
                            <td>Term deposit </td>
                            <td>36 Months</td>
                            <td>1 year</td>
                        </tr>
                        <tr>
                            <th>11</th>
                            <td>Term deposit </td>
                            <td>36 Months abobe</td>
                            <td>No</td>
                        </tr>
                        <tr>
                            <th>12</th>
                            <td>Term deposit </td>
                            <td>3 Months banks</td>
                            <td>No</td>
                        </tr>
                        <tr>
                            <th>13</th>
                            <td>Term deposit </td>
                            <td>6 Months banks</td>
                            <td>No</td>
                        </tr>
                        <tr>
                            <th>14</th>
                            <td>Term deposit </td>
                            <td>12 Months banks</td>
                            <td>No</td>
                        </tr>
                        <tr>
                            <th>15</th>
                            <td>TD NFCD </td>
                            <td>3 Months</td>
                            <td>No</td>
                        </tr>
                        <tr>
                            <th>16</th>
                            <td>TD NFCD </td>
                            <td>6 Months</td>
                            <td>No</td>
                        </tr>
                        <tr>
                            <th>17</th>
                            <td>TD NFCD </td>
                            <td>12 Months</td>
                            <td>No</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* deposit details-end */}
            {/* deposit-new */}

            <h3 className="text-3xl pt-10 text-center">Fixed <span className='text-green-700 font-bold'>Deposit </span></h3>



            <div data-aos="fade-up"
                data-aos-duration="2000" className=" my-5 lg:px-15 lg:py-10">
                <table className="table w-full">
                    {/* <!-- head start --> */}
                    <thead >
                        <tr>
                            <th></th>
                            <th>Fixed Deposit</th>
                            <th>Individuals/Pension Fund/ Provident Fund/Gratuity Fund</th>
                            <th>Non individuals</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <!-- row 1 --> */}
                        <tr>
                            <th>1</th>
                            <td>1 (one) Month</td>
                            <td>1.50%</td>
                            <td>1.50%</td>
                        </tr>

                        <tr>
                            <th>2</th>
                            <td>90 Days </td>
                            <td>6.00%</td>
                            <td>2.50%</td>
                        </tr>

                        <tr>
                            <th>3</th>
                            <td>91 Days (Below 50 Crore) </td>
                            <td>6.00%</td>
                            <td>5.50%</td>
                        </tr>
                        <tr>
                            <th>4</th>
                            <td>91 Days (50 Crore and Above) </td>
                            <td>6.00%</td>
                            <td>6.00%</td>
                        </tr>
                        <tr>
                            <th>5</th>
                            <td>92 Days (Below 5 Crore) </td>
                            <td>6.00%</td>
                            <td>4.00%</td>
                        </tr>
                        <tr>
                            <th>6</th>
                            <td>92 Days (5 Crore to Below 20 Crore) </td>
                            <td>6.00%</td>
                            <td>6.00%</td>
                        </tr>
                        <tr>
                            <th>7</th>
                            <td>92 Days (20 Crore and Above)</td>
                            <td>6.00%</td>
                            <td>6.25% </td>
                        </tr>
                        <tr>
                            <th>8</th>
                            <td>3 (Three) Months </td>
                            <td>6.00%</td>
                            <td>2.50%</td>
                        </tr>
                        <tr>
                            <th>9</th>
                            <td>3 (Three) Months</td>
                            <td>6.00%</td>
                            <td>2.50%</td>
                        </tr>
                        <tr>
                            <th>10</th>
                            <td>180 Days </td>
                            <td>6.00%</td>
                            <td>3.00%</td>
                        </tr>
                        <tr>
                            <th>11</th>
                            <td>182 Days (Below 1 Crore) </td>
                            <td>6.00%</td>
                            <td>4.00%</td>
                        </tr>
                        <tr>
                            <th>12</th>
                            <td>182 Days (1 Crore to Below 5 Crore) </td>
                            <td>6.00%</td>
                            <td>6.00%</td>
                        </tr>
                        <tr>
                            <th>13</th>
                            <td>182 Days (5 Crore to Below 20 Crore) </td>
                            <td>6.25%</td>
                            <td>6.25%</td>
                        </tr>
                        <tr>
                            <th>14</th>
                            <td>182 Days (20 Crore and Above) </td>
                            <td>6.25%</td>
                            <td>6.50%</td>
                        </tr>
                        <tr>
                            <th>15</th>
                            <td>6 (Six) Months </td>
                            <td>6.00%</td>
                            <td>5.75%</td>
                        </tr>
                        <tr>
                            <th>16</th>
                            <td>1 (One) Year </td>
                            <td>6.00%</td>
                            <td>3.50%</td>
                        </tr>
                        <tr>
                            <th>17</th>
                            <td>02 (Two) Years </td>
                            <td>6.00%</td>
                            <td>4.00%</td>
                        </tr>
                        <tr>
                            <th>18</th>
                            <td>03 (Three) Years </td>
                            <td>6.00%</td>
                            <td>4.00%</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default DepositDetails;