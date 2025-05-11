import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
import toast from "react-hot-toast";

const Withdrawals = () => {
  const [coinToWithdraw, setCoinToWithdraw] = useState(0);
  const [paymentSystem, setPaymentSystem] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const axiosSecure = useAxiosSecure();
  const { userData, refetch } = useRole();

  const dollarEquivalent = (coinToWithdraw / 20).toFixed(2);

  const handleWithdraw = async (e) => {
    e.preventDefault();

    const withdrawalData = {
      worker_email: userData.email,
      worker_name: userData.name,
      withdrawal_coins: coinToWithdraw,
      withdrawal_amount: Number(dollarEquivalent),
      payment_system: paymentSystem,
      account_number: accountNumber,
      withdraw_date: new Date().toISOString(),
      status: "pending",
    };

    await axiosSecure.post("/withdrawals", withdrawalData).then((res) => {
      if (res.data.insertedId) {
        toast.success("Your withdrawal request has been submitted.");
        setCoinToWithdraw(0);
        setPaymentSystem("");
        setAccountNumber("");
        refetch();
      }
    });
  };

  return (
    <div className="min-h-[50vh]">
      <h2 className="text-2xl sm:text-3xl text-center font-bold my-6">
        Withdraw your payment
      </h2>
      <div className="p-6 bg-white shadow-lg rounded-2xl max-w-4xl mb-10 mx-auto">
        <div className="stats stats-vertical lg:stats-horizontal shadow mb-6 w-full">
          <div className="stat">
            <div className="text-gray-600 sm:text-lg">Current Coins</div>
            <div className="stat-value">{userData.coins}</div>
            <div className="text-gray-600 max-sm:text-sm">
              Total coins you have
            </div>
          </div>
          <div className="stat">
            <div className="text-gray-600 sm:text-lg">Equivalent Dollar</div>
            <div className="stat-value">
              ${(userData.coins / 20).toFixed(2)}
            </div>
            <div className="text-gray-600 max-sm:text-sm">
              1 Dollar = 20 Coins
            </div>
          </div>
          <div className="stat">
            <div className="text-gray-600 sm:text-lg">
              Minimum Coins to Withdraw
            </div>
            <div className="stat-value">200</div>
            <div className="text-gray-600 max-sm:text-sm">
              Equivalent to $10
            </div>
          </div>
        </div>

        {userData.coins < 200 ? (
          <p className="text-red-500 mt-4 text-center">
            Insufficient coins to withdraw. Minimum 200 coins required.
          </p>
        ) : (
          <form className="mt-6 flex flex-col gap-4" onSubmit={handleWithdraw}>
            <div>
              <label className="block text-sm font-medium mb-2">
                Coins to Withdraw
              </label>
              <input
                type="number"
                min="200"
                max={userData.coins}
                value={coinToWithdraw}
                onChange={(e) => setCoinToWithdraw(Number(e.target.value))}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Withdrawal Amount (in $)
              </label>
              <input
                type="number"
                value={dollarEquivalent || 0}
                className="input input-bordered w-full bg-gray-100"
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Payment System
              </label>
              <select
                className="select select-bordered w-full"
                value={paymentSystem}
                onChange={(e) => setPaymentSystem(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Payment Method
                </option>
                <option value="Bkash">Bkash</option>
                <option value="Rocket">Rocket</option>
                <option value="Nagad">Nagad</option>
                <option value="Bankaccount">Bank Account</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Account Number
              </label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="btn bg-primary text-white hover:bg-[#0d775dd7] sm:text-lg w-full mt-4"
              disabled={coinToWithdraw > userData.coins || coinToWithdraw < 200}
            >
              Withdraw
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Withdrawals;
