import * as React from "react";


interface Props {
  balance: number
  address: string
  toAddress: string
  deposit: any
  handleChange: any
  connect: any
}

const DepositDialog: React.FC<Props> = ({
  balance,
  address,
  toAddress,
  deposit,
  handleChange,
  connect,
}) => {
  return (
    <div>
      <div className="col-sm-4 col-6 mt-5  text-primary" onClick={connect}>
        <a
          href="javascript:void()"
          type="button"
          data-toggle="modal"
          data-target="#depositDialog"
        >
          <img
            src="../assets/img/bcimg.png"
            alt="Blockchain"
            className="text-primary payment_methods_img"
          />
          <span>Manual crypto deposit</span>
        </a>
      </div>
      <div id="depositDialog" className="modal fade" role="dialog">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-body row p-0">
              <div className="col-sm-4 pop_up_modal_side_bg d-flex flex-column justify-content-center align-items-center">
                <div className="text-white text-center">
                  <i className="fad fa-coin fa-2x text-primary"></i>
                  <br />
                  Crypto Deposit
                </div>
              </div>
              <div className="col-sm-8 pr-4">
                <p className="text-danger mt-4">
                  Please deposit into the following address, upload the
                  screenshot and submit
                </p>
                <hr />
                <div className="alert alert-danger">
                  <span className=" ">Currency </span>
                  <span className=" text-danger xbold"> USDT</span>
                </div>
                <div className="alert alert-danger">
                  <span className=" ">Balance </span>
                  <span className=" text-danger xbold">{balance} USDT</span>
                </div>
                <div className="alert alert-danger">
                  <span className=" ">My Wallet </span>
                  <span className=" text-danger xbold">{address}</span>
                </div>
                <div className="mt-3 alert alert-danger">
                  <span className="">Owner Wallet</span>
                  <br />
                  <span className=" text-danger">{toAddress}</span>
                </div>

                <hr />
                <div>
                  <label>Amount</label>
                  <input
                    type="number"
                    id="usdt"
                    className="form-control"
                    name="c_amount"
                    onChange={handleChange}
                  />
                  <label className="mt-3">Proof of payment</label>
                  <input
                    type="file"
                    className="form-control"
                    name="c_pop"
                  />
                  <button
                    type="submit"
                    className="btn btn-primary mb-3 mt-3"
                    onClick={deposit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DepositDialog;
