import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";

const RefundPolicy = () => {
    return (
        <>
            <Meta title={"Electronics | Chính sách hoàn trả"} />
            <BreadCrumb title="Chính sách hoàn trả" />
            <Container class1="policy-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="policy">
                            <h2>Chính sách hoàn trả</h2>
                            <p>
                                Chúng tôi tại Electronics cam kết mang đến cho bạn những sản phẩm chất lượng cao. Tuy nhiên, nếu bạn không hài lòng với sản phẩm của mình, chúng tôi sẵn sàng hỗ trợ bạn với chính sách hoàn trả của chúng tôi.
                            </p>
                            <h3>1. Điều kiện hoàn trả</h3>
                            <p>
                                Để đủ điều kiện hoàn trả, sản phẩm của bạn phải chưa qua sử dụng và trong tình trạng như khi bạn nhận được. Sản phẩm cũng phải còn nguyên bao bì gốc.
                            </p>
                            <h3>2. Quy trình hoàn trả</h3>
                            <p>
                                Để bắt đầu quy trình hoàn trả, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại được cung cấp trên trang web của chúng tôi. Chúng tôi sẽ cung cấp cho bạn hướng dẫn chi tiết về cách gửi sản phẩm của bạn trở lại cho chúng tôi.
                            </p>
                            <h3>3. Hoàn tiền</h3>
                            <p>
                                Sau khi nhận và kiểm tra sản phẩm của bạn, chúng tôi sẽ gửi cho bạn một email thông báo rằng chúng tôi đã nhận được sản phẩm hoàn trả của bạn. Chúng tôi cũng sẽ thông báo cho bạn về việc chấp thuận hoặc từ chối hoàn tiền của bạn.
                            </p>
                            <p>
                                Nếu bạn được chấp thuận, khoản hoàn tiền của bạn sẽ được xử lý và tự động áp dụng vào thẻ tín dụng hoặc phương thức thanh toán gốc của bạn, trong một khoảng thời gian nhất định.
                            </p>
                            <h3>4. Các trường hợp không hoàn trả</h3>
                            <p>
                                Một số loại hàng hóa được miễn hoàn trả, bao gồm các sản phẩm dễ hỏng như thực phẩm, hoa, báo hoặc tạp chí. Chúng tôi cũng không chấp nhận hoàn trả cho các sản phẩm là hàng hóa thân mật hoặc vệ sinh, vật liệu nguy hiểm, hoặc chất lỏng hoặc khí dễ cháy.
                            </p>
                            <h3>5. Liên hệ</h3>
                            <p>
                                Nếu bạn có bất kỳ câu hỏi nào về chính sách hoàn trả của chúng tôi, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại được cung cấp trên trang web của chúng tôi.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default RefundPolicy;