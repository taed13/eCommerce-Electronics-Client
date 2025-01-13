import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";

const PrivacyPolicy = () => {
    return (
        <>
            <Meta title={"Chính sách bảo mật"} />
            <BreadCrumb title="Chính sách bảo mật" />
            <Container class1="policy-wrapper py-5 home-wrapper-2">
                <div className="row">
                    <div className="col-12">
                        <div className="policy">
                            <h2>Chính sách bảo mật</h2>
                            <p>
                                Chúng tôi tại Electronics cam kết bảo vệ quyền riêng tư của bạn. Chính sách bảo mật này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn khi bạn sử dụng trang web của chúng tôi.
                            </p>
                            <h3>1. Thông tin chúng tôi thu thập</h3>
                            <p>
                                Chúng tôi có thể thu thập các thông tin sau đây từ bạn:
                            </p>
                            <ul>
                                <li>Thông tin cá nhân như tên, địa chỉ email, số điện thoại và địa chỉ giao hàng.</li>
                                <li>Thông tin thanh toán như số thẻ tín dụng hoặc thông tin tài khoản ngân hàng.</li>
                                <li>Thông tin về việc sử dụng trang web của bạn, bao gồm lịch sử duyệt web và các trang bạn đã truy cập.</li>
                            </ul>
                            <h3>2. Cách chúng tôi sử dụng thông tin của bạn</h3>
                            <p>
                                Chúng tôi sử dụng thông tin cá nhân của bạn để:
                            </p>
                            <ul>
                                <li>Xử lý và hoàn thành đơn hàng của bạn.</li>
                                <li>Gửi cho bạn thông tin cập nhật về đơn hàng của bạn.</li>
                                <li>Cải thiện trải nghiệm người dùng trên trang web của chúng tôi.</li>
                                <li>Gửi cho bạn các thông tin khuyến mãi và ưu đãi đặc biệt.</li>
                            </ul>
                            <h3>3. Bảo vệ thông tin của bạn</h3>
                            <p>
                                Chúng tôi thực hiện các biện pháp bảo mật hợp lý để bảo vệ thông tin cá nhân của bạn khỏi mất mát, lạm dụng và truy cập trái phép. Tuy nhiên, không có phương thức truyền tải qua Internet hoặc phương thức lưu trữ điện tử nào là hoàn toàn an toàn. Do đó, chúng tôi không thể đảm bảo an toàn tuyệt đối cho thông tin của bạn.
                            </p>
                            <h3>4. Chia sẻ thông tin của bạn</h3>
                            <p>
                                Chúng tôi không bán, trao đổi hoặc chuyển giao thông tin cá nhân của bạn cho các bên thứ ba mà không có sự đồng ý của bạn, ngoại trừ các trường hợp sau:
                            </p>
                            <ul>
                                <li>Khi cần thiết để hoàn thành đơn hàng của bạn (ví dụ: chia sẻ thông tin với công ty vận chuyển).</li>
                                <li>Khi chúng tôi tin rằng việc chia sẻ thông tin là cần thiết để tuân thủ pháp luật hoặc bảo vệ quyền lợi của chúng tôi.</li>
                            </ul>
                            <h3>5. Quyền của bạn</h3>
                            <p>
                                Bạn có quyền truy cập, sửa đổi hoặc xóa thông tin cá nhân của mình mà chúng tôi đã thu thập. Nếu bạn muốn thực hiện bất kỳ quyền nào trong số này, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại được cung cấp trên trang web của chúng tôi.
                            </p>
                            <h3>6. Thay đổi chính sách bảo mật</h3>
                            <p>
                                Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Chúng tôi sẽ thông báo cho bạn về bất kỳ thay đổi nào bằng cách đăng chính sách bảo mật mới trên trang web của chúng tôi. Bạn nên kiểm tra chính sách bảo mật này định kỳ để đảm bảo rằng bạn biết về bất kỳ thay đổi nào.
                            </p>
                            <h3>7. Liên hệ</h3>
                            <p>
                                Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật của chúng tôi, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại được cung cấp trên trang web của chúng tôi.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default PrivacyPolicy;