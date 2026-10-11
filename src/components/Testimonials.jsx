import { feedback } from "../constants";
import styles from "../style";
import FeedbackCard from "./FeedbackCard";

const Testimonials = () => (
  <section class="testimonial-section" style={{overflow: 'auto'}}>
		<div class="large-container">
			<div class="sec-title">
     < h2 className={styles.heading2}>What clients are saying about us</h2>
			
			</div>

			<div class="testimonial-carousel owl-carousel owl-theme">
				
				<div class="testimonial-block">
					<div class="inner-box bg-primary">
						<div class="text">We have a great relationship with Seamoon Industries. Their products are high in quality, and the prices are highly competitive. We would definitely work with Seamoon for a long time. If anyone is looking to buy good dental or surgical instruments, I can definitely recommend Seamoon Industries to them.</div>
						<div class="info-box">
							<div class="thumb"><img src="http://t.commonsupport.com/adro/images/resource/thumb-1.jpg" alt=""/></div>
							<h4 class="name">Mahfuz Riad</h4>
							<span class="designation">Deals in surgical instruments</span>
						</div>
					</div>
				</div>

			
			</div>

			<div class="thumb-layer paroller">
				<figure class="image"><img src="http://t.commonsupport.com/adro/images/resource/user-thumbs.png" alt=""/></figure>
			</div>
		</div>
	</section>
)

export default Testimonials;
