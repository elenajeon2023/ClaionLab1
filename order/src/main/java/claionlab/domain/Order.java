package claionlab.domain;

import claionlab.OrderApplication;
import claionlab.domain.OrderPlaced;
import java.util.Date;
import java.util.List;
import javax.persistence.*;
import lombok.Data;

@Entity
@Table(name = "Order_table")
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String customerId;

    private Long productId;

    private String productName;

    private Integer qty;

    private String address;

    @PostPersist
    public void onPostPersist() {
        OrderPlaced orderPlaced = new OrderPlaced(this);
        orderPlaced.publishAfterCommit();
    }

    public static OrderRepository repository() {
        OrderRepository orderRepository = OrderApplication.applicationContext.getBean(
            OrderRepository.class
        );
        return orderRepository;
    }
}
