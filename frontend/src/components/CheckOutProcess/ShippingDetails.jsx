import React, { useEffect, useState } from "react";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import CheckOutProcessPage from "../../pages/CheckOutProcessPage";
import MetaData from '../MetaData'
import { isCartReadyForCheckout } from "../../utils/cartUtil";

const ShippingDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [country, setCountry] = useState(shippingInfo.country);
  const [province, setProvince] = useState(shippingInfo.province);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [city, setCity] = useState(shippingInfo.city);
  const [phone, setPhone] = useState(shippingInfo.phone);

  useEffect(() => {
    if (isCartReadyForCheckout(cartItems)) {
      navigate("/cart"); 
    }
  }, [cartItems, navigate]);

  const shipppingSubmit = (e) => {
    e.preventDefault();
    if (phone.length < 11 || phone.length > 11) {
      alert("Phone Number must be 11 digits");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, country, pinCode, phone, province })
    );
    navigate("/order/confirm");
  };

  return (
    <div>
      <>
        <MetaData title="Shipping Details" />
        <CheckOutProcessPage aciveStep={0} />
        <div className="shippingContainer">
          <div className="shippingBox">
            <h2 className="shippingHeading">Shipping Details</h2>
            <form
              className="shippingForm"
              encType="multipart/form-data"
              onSubmit={shipppingSubmit}
            >
              <div className="sd">
                <HomeIcon />
                <input
                  type="text"
                  placeholder="Address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <LocationCityIcon />
                <input
                  type="text"
                  placeholder="City"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div>
                <PinDropIcon />
                <input
                  type="text"
                  placeholder="Pin Code"
                  required
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
              </div>
              <div>
                <PhoneIcon />
                <input
                  type="text"
                  placeholder="Phone Number"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  size="10"
                />
              </div>
              <div>
                <PublicIcon />
                <input
                  type="text"
                  placeholder="Province"
                  required
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                />
              </div>
              <div>
                <PublicIcon />
                <input
                  type="text"
                  placeholder="Country"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Continue"
                className="bg-[#FE4C50] px-20 py-2 hover:bg-[#FE4C50]/90 cursor-pointer text-white mt-10"
              />
            </form>
          </div>
        </div>
      </>
    </div>
  );
};

export default ShippingDetails;
