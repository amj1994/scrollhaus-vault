import { Navbar } from "../Navbar/Navbar";
import { WalletCard } from "../WalletCard/WalletCard";
import { CardsConnectorArrow } from "../WalletCard/CardsConnectorArrow";
import { TexturedFabButton } from "../common/TexturedFabButton";
import { MenuBarsBadgeIcon } from "../icons";
import { HeroCopy } from "../HeroSection/HeroCopy";
import { FloatingIcons } from "../FeatureSection/FloatingIcons";
import { PromoCard } from "../FeatureSection/PromoCard";
const stars = "https://qclay.design/lovable/crypto/1.png";
import styles from "./HeroFeatureSection.module.css";

export function HeroFeatureSection() {
  return (
      <section className={styles.section} id="top">
        <div className={styles.heroContainer}>
          <div className={styles.navWrap}>
            <Navbar />
          </div>

          <div className={styles.body}>
            <div className={styles.copyColumn}>
              <img src={stars} alt="stars" className={styles.stars} />
              <HeroCopy />
            </div>
            <div className={styles.heroCardColumn}>
              <WalletCard />
            </div>
          </div>
        </div>

        <div className={styles.featureContainer} id="digital-assets">
          <FloatingIcons />
          <div className={styles.grid}>
            <div className={styles.promoColumn}>

              <div className={styles.gradientFeatureOrange}></div>
              <div className={styles.gradientFeatureBlue}></div>

              <PromoCard />
            </div>

            <div className={styles.connector} aria-hidden="true">
              <CardsConnectorArrow />

            </div>

            <div className={styles.featureCardColumn}>
              <WalletCard
                  balance="00.0495"
                  showCursor
                  address="03x01 89xu2 .. 16x94 x893q"
                  actionIcon={<MenuBarsBadgeIcon size={44} />}
                  actionLabel="Menu"
                  actionButtonSize="clamp(40px, 3.4vw, 44px)"
                  showBadges={false}
                  showPagination={false}
                  showHeader={false}
                  showStageBackground={false}
                  cornerButton={<TexturedFabButton />}
                  cornerButtonInset="clamp(-8px, -0.6vw, -4px)"
              />

              <div className={styles.gradientFeatureOrange2}></div>
              <div className={styles.gradientFeatureBlue2}></div>
            </div>
          </div>
        </div>
      </section>
  );
}