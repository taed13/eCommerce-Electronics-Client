import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";

const ShippingPolicy = () => {
    return (
        <>
            <Meta title={"Electronics | Chính sách vận chuyển"} />
            <BreadCrumb title="Chính sách vận chuyển" />
            <Container class1="policy-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="policy">
                            <h2>Chính sách vận chuyển</h2>
                            <p>
                                Chúng tôi tại Electronics cam kết mang đến cho bạn những sản phẩm chất lượng cao và dịch vụ vận chuyển tốt nhất. Dưới đây là các điều khoản và điều kiện về chính sách vận chuyển của chúng tôi.
                            </p>
                            <h3>1. Thời gian xử lý đơn hàng</h3>
                            <p>
                                Tất cả các đơn hàng được xử lý trong vòng 1-2 ngày làm việc (không bao gồm cuối tuần và ngày lễ) sau khi nhận được đơn đặt hàng. Bạn sẽ nhận được thông báo khi đơn hàng của bạn đã được gửi đi.
                            </p>
                            <h3>2. Thời gian vận chuyển</h3>
                            <p>
                                Thời gian vận chuyển có thể khác nhau tùy thuộc vào địa điểm giao hàng. Thông thường, thời gian vận chuyển trong nước là từ 3-7 ngày làm việc. Đối với các đơn hàng quốc tế, thời gian vận chuyển có thể từ 7-14 ngày làm việc.
                            </p>
                            <h3>3. Phí vận chuyển</h3>
                            <p>
                                Phí vận chuyển sẽ được tính dựa trên trọng lượng của sản phẩm và địa điểm giao hàng. Phí vận chuyển sẽ được hiển thị tại trang thanh toán trước khi bạn hoàn tất đơn hàng.
                            </p>
                            <h3>4. Theo dõi đơn hàng</h3>
                            <p>
                                Sau khi đơn hàng của bạn được gửi đi, chúng tôi sẽ cung cấp cho bạn một mã theo dõi để bạn có thể theo dõi tình trạng đơn hàng của mình. Bạn có thể kiểm tra tình trạng đơn hàng bằng cách nhập mã theo dõi trên trang web của chúng tôi.
                            </p>
                            <h3>5. Vấn đề vận chuyển</h3>
                            <p>
                                Nếu bạn gặp bất kỳ vấn đề nào với việc vận chuyển, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại được cung cấp trên trang web của chúng tôi. Chúng tôi sẽ hỗ trợ bạn giải quyết vấn đề một cách nhanh chóng và hiệu quả.
                            </p>
                            <h3>6. Địa chỉ giao hàng</h3>
                            <p>
                                Vui lòng đảm bảo rằng bạn cung cấp địa chỉ giao hàng chính xác và đầy đủ. Chúng tôi không chịu trách nhiệm cho các đơn hàng không được giao do địa chỉ không chính xác hoặc không đầy đủ.
                            </p>
                            <h3>7. Thay đổi địa chỉ giao hàng</h3>
                            <p>
                                Nếu bạn cần thay đổi địa chỉ giao hàng sau khi đã đặt hàng, vui lòng liên hệ với chúng tôi càng sớm càng tốt. Chúng tôi sẽ cố gắng thay đổi địa chỉ giao hàng nếu đơn hàng của bạn chưa được gửi đi.
                            </p>
                            <h3>8. Chính sách hủy đơn hàng</h3>
                            <p>
                                Bạn có thể hủy đơn hàng của mình trước khi đơn hàng được gửi đi. Sau khi đơn hàng đã được gửi đi, chúng tôi không thể hủy đơn hàng của bạn. Vui lòng liên hệ với chúng tôi để biết thêm chi tiết về chính sách hủy đơn hàng.
                            </p>
                            <h3>9. Liên hệ</h3>
                            <p>
                                Nếu bạn có bất kỳ câu hỏi nào về chính sách vận chuyển của chúng tôi, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại được cung cấp trên trang web của chúng tôi.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default ShippingPolicy;