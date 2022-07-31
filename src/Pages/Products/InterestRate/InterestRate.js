import React from 'react';
import interestImages from '../../../Assets/Images/products/interest1.jpg'
const InterestRate = () => {
    
    return (
        <div>
            {/* new-banner-start */}
            <section style={{
                backgroundImage: `url(${interestImages})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
                className='flex justify-center items-center  bg-cover pt-24 px-10 mt-8' >
                <div className='flex-1 hidden lg:block '>
                    <img className='mt-[-130px]' src='https://www.freeiconspng.com/thumbs/bank-icon/blue-bank-icon-in-flat-style-with-the-building-facade-with-three--26.png' alt="" />

                </div>
             

            </section>

            <div>
                {/* table */}
                <div class="overflow-x-auto px-20 py-16">
                    <table class="table table-zebra w-full">

                        <thead>

                            <tr>
                                <th></th>
                                <th>Deposit Products</th>
                                <th>Interest  Rate</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr className='text-center justify-center'>
                                <th></th>
                                <td> General Savings Account</td>
                                <td></td>

                            </tr>

                            <tr>
                                <th>1</th>
                                <td>Current Deposits</td>
                                <td>0.00%</td>

                            </tr>


                            <tr>
                                <th>2</th>
                                <td>Easy Current Account</td>
                                <td>1.00%</td>

                            </tr>

                            <tr>
                                <th>3</th>
                                <td>Easy Plus Current Account</td>
                                <td>1.50%</td>

                            </tr>

                            <tr>
                                <th>4</th>
                                <td>Below 1 Lac</td>
                                <td>1.00%</td>

                            </tr>
                            <tr>
                                <th>5</th>
                                <td>1 Lac and Above</td>
                                <td>1.50%</td>

                            </tr>
                            <tr>
                                <th>6</th>
                                <td>Below 1 Lac </td>
                                <td>0.00%</td>

                            </tr>
                            <tr className='text-center justify-center'>
                                <th></th>
                                <td>Alo General Savings Account</td>
                                <td></td>

                            </tr>
                            <tr>
                                <th>7</th>
                                <td>1 lac - Below 5 Lac</td>
                                <td>0.50%</td>

                            </tr>
                            <tr>
                                <th>8</th>
                                <td>5 Lac - Below 30 Lac</td>
                                <td>0.75%</td>

                            </tr>
                            <tr>
                                <th>9</th>
                                <td>30 Lac and Above</td>
                                <td>1.00%</td>

                            </tr>
                            <tr className='text-center justify-center'>
                                <th></th>
                                <td>Alo High Value Savings Account</td>
                                <td></td>

                            </tr>
                            <tr>
                                <th>10</th>
                                <td>Below 1 Lac </td>
                                <td>0.00%</td>

                            </tr>
                            <tr>
                                <th>11</th>
                                <td>1 lac - Below 5 Lac</td>
                                <td>0.50%</td>

                            </tr>
                            <tr>
                                <th>12</th>
                                <td>5 Lac - Below 30 Lac</td>
                                <td>1.00%</td>

                            </tr>
                            <tr>
                                <th>13</th>
                                <td>Easy Plus Current Account</td>
                                <td>1.50%</td>

                            </tr>
                            <tr>
                                <th>14</th>
                                <td>Easy Plus Current Account</td>
                                <td>1.50%</td>

                            </tr>
                            <tr>
                                <th>15</th>
                                <td>30 Lac and Above</td>
                                <td>1.50%</td>

                            </tr>
                            <tr className='text-center justify-center'>
                                <th></th>
                                <td>Student Savings Account</td>
                                <td></td>

                            </tr>
                            <tr>
                                <th>16</th>
                                <td>Easy Plus Current Account</td>
                                <td>1.50%</td>

                            </tr>
                            <tr>
                                <th>17</th>
                                <td>  School Plan</td>
                                <td>2.00%</td>

                            </tr>
                            <tr>
                                <th>18</th>
                                <td>College Plan</td>
                                <td>1.75%</td>

                            </tr>
                            <tr>
                                <th>19</th>
                                <td>New Born's Deposit A/C </td>
                                <td>1.50%</td>

                            </tr>
                            <tr className='text-center justify-center'>
                                <th></th>
                                <td>Seniors’ Savings Account </td>
                                <td></td>

                            </tr>
                            <tr>
                                <th>20</th>
                                <td>Below 25 Thousand</td>
                                <td>0.00%</td>

                            </tr>
                            <tr>
                                <th>21</th>
                                <td>25 Thousand - Below 1 Lac</td>
                                <td>0.50%</td>

                            </tr>
                            <tr>
                                <th>22</th>
                                <td>1 Lac - Below 5 Lac</td>
                                <td>0.75%</td>

                            </tr>
                            <tr>
                                <th>23</th>
                                <td>5 Lac - Below 25 Lac</td>
                                <td>1.00%</td>

                            </tr>
                            <tr>
                                <th>24</th>
                                <td>25 Lac and Above</td>
                                <td>1.50%</td>

                            </tr>
                            <tr className='text-center justify-center'>
                                <th></th>
                                <td>Savings Delight Account </td>
                                <td></td>

                            </tr>
                            <tr>
                                <th>25</th>
                                <td>Below 5 Lac </td>
                                <td>0.00%</td>

                            </tr>
                            <tr>
                                <th>26</th>
                                <td>5 Lac - below 10 Lac </td>
                                <td>0.50%</td>

                            </tr>
                            <tr>
                                <th>27</th>
                                <td>10 Lac - below 20 Lac  </td>
                                <td>1.25%</td>

                            </tr>
                            <tr>
                                <th>28</th>
                                <td>20 Lac - below 30 Lac  </td>
                                <td>1.50%</td>

                            </tr>
                            <tr>
                                <th>29</th>
                                <td>30 Lac and Above </td>
                                <td>1.75%</td>

                            </tr>
                            <tr className='text-center justify-center'>
                                <th></th>
                                <td>Corporate Transactional Account</td>
                                <td></td>

                            </tr>
                            <tr>
                                <th>30</th>
                                <td>BDT below 20 Crore</td>
                                <td>2.50%</td>
                            </tr>
                            <tr>
                                <th>31</th>
                                <td>BDT 20 Crore to below 50 crore</td>
                                <td>4.50%</td>
                            </tr>
                            <tr>
                                <th>32</th>
                                <td>BDT 50 Crore to below 100 crore</td>
                                <td>5.00%</td>
                            </tr>
                            <tr>
                                <th>33</th>
                                <td>BDT 100 crore and above</td>
                                <td>6.00%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* table end */}
            </div>
        </div>
    );
};

export default InterestRate;