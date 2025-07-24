import React, { useState } from "react";

const CardInfo = ({ username = "morden", initialBalance = 2190.19 }) => {
  const [cardDetails, setCardDetails] = useState({
    username,
    cardNumber: "0818 7183 0713 2514",
    cvv: "726",
    expiryDate: "07/10",
    cardType: "Credit",
    balance: initialBalance,
  });

  const [flipped, setFlipped] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleFlip = () => setFlipped(!flipped);
  const toggleModal = () => setShowModal(!showModal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <div className="w-full bg-[#fefffd]  p-7 rounded-2xl shadow-md flex flex-col gap-5 relative">
      <div className="font-semibold text-[20px] text-gray-900">My Cards</div>

      {/* Flip Card */}
      <div className="relative h-[200px] perspective">
        <div
          className={`transition-transform duration-500 ease-in-out w-full h-full rounded-2xl transform-style preserve-3d ${
            flipped ? "rotate-y-180" : ""
          }`}
          onClick={toggleFlip}
        >
          {/* Front */}
          r<div className="absolute inset-0 bg-gradient-to-r from-purple-950 to-purple-600  text-white rounded-2xl p-6 backface-hidden flex flex-col justify-between cursor-pointer">
            <div className="flex justify-between items-center">
              <div className="w-8 h-6 bg-yellow-400 rounded-sm"></div>
              <div className="text-sm capitalize">{cardDetails.username}</div>
            </div>
            <div className="text-xl font-bold tracking-widest mt-4">
              {cardDetails.cardNumber}
            </div>
            <div className="flex justify-between text-sm mt-4">
              <div>{cardDetails.expiryDate}</div>
              <div className="font-semibold">VISA</div>
            </div>
          </div>

          {/* Back */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-950 to-purple-600  text-white rounded-2xl p-6 backface-hidden transform rotate-y-180 flex flex-col justify-center items-center cursor-pointer">
            <div className="w-full h-8 bg-white/30 mb-4"></div>
            <div className="text-center">
              <div className="text-sm mb-2">CVV</div>
              <div className="text-2xl font-bold">{cardDetails.cvv}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Card Info */}
      <div className="bg-[#F5F5F5] rounded-2xl p-4 flex justify-between items-center">
        <div>
          <div className="text-[14px] text-[#8B8E99]">Your Balance</div>
          <div className="text-[22px] font-bold text-[#0E1C36]">
            ${parseFloat(cardDetails.balance).toFixed(2)}
          </div>
        </div>
        <div className="text-right text-sm text-[#8B8E99]">
          Currency <br />
          <span className="text-[#0E1C36]">USD / US Dollar</span>
        </div>
      </div>

      <div className="flex justify-between text-sm text-[#8B8E99]">
        <div>
          Status <br />
          <span className="text-green-600 font-semibold">Active</span>
        </div>
        <div>
          Card Type <br />
          <span className="text-yellow-300 font-semibold">{cardDetails.cardType}</span>
        </div>
      </div>

      <button
        onClick={toggleModal}
        className="w-full mt-2 py-2 bg-gradient-to-r from-purple-950 to-purple-600 text-white rounded-xl font-semibold hover:opacity-90 transition"
      >
        Edit Card Details
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg relative">
            <h2 className="text-xl font-bold text-[#0E1C36] mb-4">Edit Card Details</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                name="username"
                value={cardDetails.username}
                onChange={handleChange}
                placeholder="Cardholder Name"
                className="border p-2 rounded"
              />
              <input
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleChange}
                placeholder="Card Number"
                className="border p-2 rounded"
              />
              <input
                name="cvv"
                value={cardDetails.cvv}
                onChange={handleChange}
                placeholder="CVV"
                className="border p-2 rounded"
              />
              <input
                name="expiryDate"
                value={cardDetails.expiryDate}
                onChange={handleChange}
                placeholder="Expiry Date (MM/YY)"
                className="border p-2 rounded"
              />
              <input
                name="cardType"
                value={cardDetails.cardType}
                onChange={handleChange}
                placeholder="Card Type (e.g. Credit)"
                className="border p-2 rounded"
              />
              <input
                name="balance"
                value={cardDetails.balance}
                onChange={handleChange}
                placeholder="Balance"
                type="number"
                className="border p-2 rounded"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-[#0E1C36] text-white hover:opacity-90"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardInfo;
