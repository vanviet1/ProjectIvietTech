import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrderStart } from '../../../Redux/actions/orderAction';
import HistoryOrder from '../../../components/UserHomePage/HistoryOrder/HistoryOrder';
import { Modal, Image } from 'antd';
import './settingUi.scss';
import ModalEditUser from './ModalEditUser';
import { actGetProfileUI } from '../../../Redux/actions/actionAuthUser';

const SettingUserUI = () => {
    const { profile } = useSelector(state => state.authUser)
    const dispatch = useDispatch();
    const { orders } = useSelector(state => state.orders)
    const [visible, setVisible] = useState(false);
    const userUI = JSON.parse(localStorage.getItem('userUI')) || null;

    useEffect(() => {
        dispatch(loadOrderStart())
    }, []);

    useEffect(() => {
        if (userUI) {
            dispatch(actGetProfileUI(userUI))
        }
    }, [])

    const orderUser = orders.filter(item => item.userId === profile.userUiId)

    return (
        <div className="setting">
            <div class="container rounded bg-white mt-5 mb-5">
                <div class="row">
                    <div class="col-md-3 border-right pr-3">
                        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                            <Image
                                width={180}
                                height={180}
                                src={userUI.avatar}
                            />
                            <h5 class="font-weight-bold text-uppercase mt-3">{userUI.fullname}</h5>
                        </div>
                    </div>
                    <div class="col-md-5 border-right">
                        <div class="p-3 py-5">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                            </div>
                            <div class="row mt-3">
                                <div class="col-md-12">
                                    <label class="labels">H??? v?? t??n</label>
                                    <input disabled type="text" class="form-control" placeholder="H??? v?? t??n" value={userUI.fullname} />
                                </div>
                                <div class="col-md-12 mt-3">
                                    <label class="labels">S??? ??i???n tho???i</label>
                                    <input disabled type="text" class="form-control" placeholder="S??? ??i???n tho???i" value={userUI.phone} />
                                </div>
                                <div class="col-md-12 mt-3">
                                    <label class="labels">?????a ch???</label>
                                    <input disabled type="text" class="form-control" placeholder="?????a ch???" value={userUI.address} />
                                </div>
                                <div class="col-md-12 mt-3">
                                    <label class="labels">E-mail</label>
                                    <input disabled type="text" class="form-control" placeholder="E-mail" value={userUI.email} />

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="p-3 py-5">
                            <div class="col-md-12 mt-3">
                                <label class="labels">Gi???i t??nh</label>
                                <input disabled type="text" class="form-control" placeholder="Gi???i t??nh" value={userUI.gender} />
                            </div>
                            <div class="col-md-12 mt-3">
                                <label class="labels">Ng??y sinh</label>
                                <input disabled type="date" class="form-control" placeholder="Ng??y sinh" value={userUI.birthday} />
                            </div>
                        </div>
                        <span class="profile-edit" onClick={() => setVisible(true)}><i className="fas fa-pencil-alt"></i> Ch???nh s???a</span>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-12">
                        <h4>L???ch s??? ?????t h??ng</h4>
                        <HistoryOrder orderUser={orderUser} />
                    </div>
                </div>
                <div>

                    <Modal
                        title="Ch???nh s???a t??i kho???n"
                        visible={visible}
                        width={700}
                        footer={null}
                        onCancel={() => setVisible(false)}
                    >
                        <ModalEditUser setVisible={setVisible} profile={userUI} />
                    </Modal>
                </div>
            </div>

        </div>
    );
};

export default SettingUserUI;