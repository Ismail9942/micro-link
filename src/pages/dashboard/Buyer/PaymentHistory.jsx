import { useEffect, useState } from "react";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { userData } = useRole();
  const axiosSecure = useAxiosSecure();

  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      const { data } = await axiosSecure.get(`/payments/${userData.email}`);
      setPaymentHistory(data);
      setLoading(false);
    };

    fetchPaymentHistory();
  }, [axiosSecure, userData.email]);

  if (loading) {
    return (
      <div className="flex justify-center min-h-[50vh]">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-[50vh]">
      <div className="p-6">
        <h2 className="text-2xl sm:text-3xl text-center font-bold mb-10">
          Payment History
        </h2>
        {paymentHistory.length > 0 ? (
          <div className="bg-white shadow-md">
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-orange-100 text-left">
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                    <th className="border border-gray-300 px-4 py-2">Coins</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Amount ($)
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Payment ID
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paymentHistory.map((payment, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(payment.date).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {payment.coins}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        ${payment.price.toFixed(2)}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {payment.paymentId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 ">
            No payment history found.
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
