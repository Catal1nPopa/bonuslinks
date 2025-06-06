import { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Container,
  Box,
  Grid,
  Chip,
  IconButton,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
  Tabs,
  Tab,
  AppBar,
  Toolbar,
} from "@mui/material";
import { motion } from "framer-motion";
import { ContentCopy, ArrowForward, Star } from "@mui/icons-material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const categories = [
  {
    id: "hosting",
    name: "Hosting",
    icon: "🖥️",
  },
  {
    id: "crypto",
    name: "Crypto",
    icon: "₿",
  },
  {
    id: "banking",
    name: "Banking",
    icon: "🏦",
  },
  {
    id: "investing",
    name: "Investing",
    icon: "📈",
  },
  {
    id: "design",
    name: "Design",
    icon: "🎨",
  },
];

const links = {
  hosting: [
    {
      name: "Hostinger | Premium Web Hosting",
      bonus: "-20% discount",
      description:
        "Everything you need to create your website. You pay -20%. 25 Websites | ~25 000 Visits Monthly | 25 GB SSD Storage | 400 000 Files and Directories (Inodes)",
      url: "https://www.hostinger.com/cart?product=hosting%3Ahostinger_premium&period=12&referral_type=cart_link&REFERRALCODE=E9JMISTERFH6&referral_id=019743fd-c5ad-7378-b7f5-b815825e72d9",
    },
    {
      name: "Hostinger | Business Web Hosting",
      bonus: "-20% discount",
      description:
        "Level-up with more power and enhanced features. 50 Websites | ~100 000 Visits Monthly | 50 GB NVMe Storage | 600 000 Files and Directories (Inodes)",
      url: "https://www.hostinger.com/cart?product=hosting%3Ahostinger_business&period=12&referral_type=cart_link&REFERRALCODE=E9JMISTERFH6&referral_id=019743ff-ce92-72c8-9c04-82839bdbd022",
      popular: true,
    },
    {
      name: "Hostinger | Cloud Startup",
      bonus: "-20% discount",
      description:
        "Optimized for business and eCommerce websites. 100 Websites | ~200 000 Visits Monthly | 100 GB NVMe Storage | 2 000 000 Files and Directories (Inodes)",
      url: "https://www.hostinger.com/cart?product=hosting%3Acloud_economy&period=12&referral_type=cart_link&REFERRALCODE=E9JMISTERFH6&referral_id=01974401-61f3-7205-8a50-68f18a6c1ead",
    },
    {
      name: "Hostinger | Cloud Startup",
      bonus: "-20% discount",
      description:
        "Optimized for business and eCommerce websites. 100 Websites | 100 GB NVMe Storage | 3 GB RAM | 2 CPU Cores",
      url: "https://www.hostinger.com/cart?product=hosting%3Acloud_economy&period=48&referral_type=cart_link&REFERRALCODE=E9JMISTERFH6&referral_id=01974409-2d9e-7218-aab8-48d134c5f132",
    },
    {
      name: "Hostinger | Cloud Professional",
      bonus: "-20% discount",
      description:
        "Optimized for scaling professional websites. 200 Websites | 200 GB NVMe Storage | 6 GB RAM | 4 CPU Cores",
      url: "https://www.hostinger.com/cart?product=hosting%3Acloud_professional&period=48&referral_type=cart_link&REFERRALCODE=E9JMISTERFH6&referral_id=01974407-92ec-7342-b358-83999ec98b6c",
      popular: true,
    },
    {
      name: "Hostinger | Cloud Enterprise",
      bonus: "-20% discount",
      description:
        "Maximum performance for your websites. 300 Websites | 300 GB NVMe Storage | 12 GB RAM | 6 CPU Cores",
      url: "https://www.hostinger.com/cart?product=hosting%3Acloud_enterprise&period=48&referral_type=cart_link&REFERRALCODE=E9JMISTERFH6&referral_id=0197440a-4b00-701d-af73-1eede18d0444",
      popular: true,
    },
    {
      name: "Hostinger | VPS - Virtual Private Server ",
      bonus: "-20% discount",
      description:
        "KVM 1 | 1 vCPU Core | 4 GB RAM | 50 GB NVMe Disk Space | 4 TB Bandwidth",
      url: "https://www.hostinger.com/cart?product=vps%3Avps_kvm_1&period=12&referral_type=cart_link&REFERRALCODE=E9JMISTERFH6&referral_id=0197440c-aa56-7225-8856-577b87a35b65",
    },
    {
      name: "Hostinger | VPS - Virtual Private Server ",
      bonus: "-20% discount",
      description:
        "KVM 2 | 2 vCPU Core | 8 GB RAM | 100 GB NVMe Disk Space | 8 TB Bandwidth",
      url: "https://www.hostinger.com/cart?product=vps%3Avps_kvm_2&period=12&referral_type=cart_link&REFERRALCODE=E9JMISTERFH6&referral_id=0197440d-335d-7294-8e5f-830d29963dd8",
      popular: true,
    },
    {
      name: "Hostinger | VPS - Virtual Private Server ",
      bonus: "-20% discount",
      description:
        "KVM 4 | 4 vCPU Core | 16 GB RAM | 200 GB NVMe Disk Space | 16 TB Bandwidth",
      url: "https://www.hostinger.com/cart?product=vps%3Avps_kvm_4&period=12&referral_type=cart_link&REFERRALCODE=E9JMISTERFH6&referral_id=0197440e-c328-7049-a090-df4abf0b9615",
    },
    {
      name: "Hostinger | VPS - Virtual Private Server ",
      bonus: "-20% discount",
      description:
        "KVM 8 | 8 vCPU Core | 32 GB RAM | 400 GB NVMe Disk Space | 32 TB Bandwidth",
      url: "https://www.hostinger.com/cart?product=vps%3Avps_kvm_8&period=12&referral_type=cart_link&REFERRALCODE=E9JMISTERFH6&referral_id=0197440e-72f8-7312-8b42-57b97b437547",
    },
    {
      name: "Hostinger | Business Starter email",
      bonus: "-20% discount",
      description:
        "Perfect for small businesses that are starting to build their brand. | 10 GB Storage per Mailbox | Option to get extra mailbox storage | 10 Forwarding Rule | 10 Email Alias",
      url: "https://www.hostinger.com/cart?product=hostinger_mail%3Apro&period=12&referral_type=cart_link&REFERRALCODE=E9JMISTERFH6&referral_id=0197440f-f35e-73f3-a00f-b2b10757c2c3",
    },
    {
      name: "Hostinger | Business Premium email",
      bonus: "-20% discount",
      description:
        "For scaling teams who need plenty of email storage. | 50 GB Storage per Mailbox | Option to get extra mailbox storage | 50 Forwarding Rule | 50 Email Alias | Free domain",
      url: "https://www.hostinger.com/cart?product=hostinger_mail%3Apremium&period=12&referral_type=cart_link&REFERRALCODE=E9JMISTERFH6&referral_id=01974410-e9b6-7050-9c69-05c54b98c5d6",
      popular: true,
    },
    {
      name: "Hostinger | Premium Website Builder",
      bonus: "-20% discount",
      description:
        "Get the essentials you need to create a website. | 25 Websites | AI website builder | Free Domain",
      url: "https://www.hostinger.com/cart?product=hosting%3Ahostinger_premium&period=12&referral_type=cart_link&REFERRALCODE=E9JMISTERFH6&referral_id=01974412-f8e1-70db-99a7-f7002f61bed3&product_type=website-builder",
    },
    {
      name: "Hostinger | Business Website Builder",
      bonus: "-20% discount",
      description:
        "Grow with advanced AI tools and eCommerce features. | 50 Websites | AI website builder | Free Domain | eCommerce Features",
      url: "https://www.hostinger.com/cart?product=hosting%3Ahostinger_business&period=12&referral_type=cart_link&REFERRALCODE=E9JMISTERFH6&referral_id=01974413-938d-717b-8366-577308a64df7&product_type=website-builder",
      popular: true,
    },
  ],
  crypto: [
    {
      name: "Crypto.com",
      bonus: "$25 bonus",
      description: "Obține $25 în CRO la înregistrare.",
      url: "https://crypto.com/app/example",
      popular: true,
    },
    {
      name: "Binance",
      bonus: "Reducere la comisioane",
      description: "Înregistrează-te și plătești mai puțin la tranzacții.",
      url: "https://binance.com/en/register?ref=example",
    },
    {
      name: "Coinbase",
      bonus: "$10 în Bitcoin",
      description: "Primești $10 în Bitcoin după prima tranzacție de $100.",
      url: "https://coinbase.com/join/example",
      popular: true,
    },
  ],
  banking: [
    {
      name: "Revolut",
      bonus: "50 RON bonus",
      description: "Primești 50 RON după ce faci prima plată.",
      url: "https://revolut.com/referral/example",
      popular: true,
    },
    {
      name: "Curve",
      bonus: "Card cu cashback",
      description: "Primești £5 după prima tranzacție.",
      url: "https://www.curve.com/join/example",
    },
  ],
  investing: [
    {
      name: "Trading 212",
      bonus: "Acțiuni gratuite",
      description: "Primești o acțiune gratuită la cont nou.",
      url: "https://www.trading212.com/invite/example",
    },
    {
      name: "eToro",
      bonus: "$50 la primul depozit",
      description: "Primești $50 când depui $200.",
      url: "https://www.etoro.com/join/example",
    },
  ],
  design: [
    {
      name: "Canva Pro",
      bonus: "30 zile gratis",
      description: "30 de zile de Canva Pro gratuit.",
      url: "https://www.canva.com/join/example",
    },
    {
      name: "Figma Pro",
      bonus: "3 luni gratis",
      description: "3 luni de Figma Professional.",
      url: "https://www.figma.com/join/example",
    },
  ],
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
  hover: {
    y: -5,
    transition: { duration: 0.2 },
  },
};

export default function ReferralPage() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [copiedLink, setCopiedLink] = useState("");
  const [activeCategory, setActiveCategory] = useState("hosting");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tabsRef = useRef(null);

  useEffect(() => {
    document.title = "Bonuses & Discounts via My Referral Links";
  }, []);

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(url);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleCategoryChange = (event, newValue) => {
    setActiveCategory(newValue);
  };

  const scrollTabs = (direction) => {
    const container = tabsRef.current?.querySelector(".MuiTabs-scroller");
    if (container) {
      container.scrollBy({
        left: direction === "left" ? -150 : 150,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: `
      linear-gradient(
        135deg,
        ${theme.palette.primary.dark} 0%,
        ${theme.palette.primary.main} 50%,
        ${theme.palette.secondary.dark} 100%
      )
    `,
        color: "white",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          zIndex: 0,
        },
      }}
    >
      <AppBar
        position="static"
        sx={{
          background: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          justifyContent: "center",
        }}
      >
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="h6">🎁 Bonus Links</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant={isMobile ? "h4" : "h2"}
            fontWeight="bold"
            gutterBottom
            sx={{
              textShadow: "0 2px 8px rgba(0,0,0,0.2)",
              mb: 2,
              textAlign: "center",
            }}
          >
            The best discounts
          </Typography>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            color="rgba(255,255,255,0.8)"
            paragraph
            sx={{
              maxWidth: "800px",
              margin: "0 auto",
              mb: 6,
              textAlign: "center",
            }}
          >
            Choose a category and enjoy special offers
          </Typography>
        </motion.div>

        <Box sx={{ position: "relative", mb: 4 }}>
          {isMobile && (
            <>
              <IconButton
                onClick={() => scrollTabs("left")}
                sx={{
                  position: "absolute",
                  left: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 2,
                  backgroundColor: "rgba(0,0,0,0.3)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                  },
                }}
              >
                <ArrowBackIos fontSize="small" />
              </IconButton>

              <IconButton
                onClick={() => scrollTabs("right")}
                sx={{
                  position: "absolute",
                  right: 0,
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 2,
                  backgroundColor: "rgba(0,0,0,0.3)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                  },
                }}
              >
                <ArrowForwardIos fontSize="small" />
              </IconButton>
            </>
          )}

          <Tabs
            value={activeCategory}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons={false}
            ref={tabsRef}
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: theme.palette.secondary.main,
                height: 3,
              },
            }}
          >
            {categories.map((category) => (
              <Tab
                key={category.id}
                label={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </Box>
                }
                value={category.id}
                sx={{
                  color:
                    activeCategory === category.id
                      ? "red"
                      : "rgba(255,255,255,0.7)",
                  fontWeight:
                    activeCategory === category.id ? "bold" : "normal",
                  fontSize: isMobile ? "0.8rem" : "1rem",
                  minHeight: 48,
                  px: 2,
                  textTransform: "none",
                }}
              />
            ))}
          </Tabs>
        </Box>

        <motion.div variants={container} initial="hidden" animate="show">
          <Grid container spacing={3} justifyContent="center">
            {links[activeCategory].map((link, index) => (
              <Grid item xs={12} sm={8} md={6} lg={4} xl={3} key={index}>
                <motion.div variants={item} whileHover="hover">
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      maxWidth: "390px",
                      flexDirection: "column",
                      background: "rgba(255, 255, 255, 0.08)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      borderRadius: 4,
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                      transition: "transform 0.3s, box-shadow 0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.3)",
                      },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 1,
                        }}
                      >
                        <Typography variant="h5" fontWeight="600">
                          {link.name}
                        </Typography>
                        {link.popular && (
                          <Chip
                            icon={<Star fontSize="small" />}
                            label="Popular"
                            size="small"
                            color="secondary"
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Box>

                      <Chip
                        label={link.bonus}
                        color="primary"
                        size="small"
                        sx={{ mb: 2, fontWeight: "bold" }}
                      />

                      <Typography
                        variant="body2"
                        color="rgba(255,255,255,0.7)"
                        sx={{ mb: 3 }}
                      >
                        {link.description}
                      </Typography>

                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Button
                          variant="contained"
                          color="secondary"
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          endIcon={<ArrowForward />}
                          fullWidth
                          sx={{
                            borderRadius: 2,
                            py: 1.5,
                            fontWeight: "bold",
                            background:
                              "linear-gradient(45deg, #6366F1, #4F46E5)",
                            "&:hover": {
                              background:
                                "linear-gradient(45deg, #4F46E5, #4338CA)",
                            },
                          }}
                        >
                          Obține bonus
                        </Button>

                        <IconButton
                          color="inherit"
                          onClick={() => handleCopy(link.url)}
                          sx={{
                            border: "1px solid rgba(255,255,255,0.2)",
                            borderRadius: 2,
                            "&:hover": {
                              backgroundColor: "rgba(255,255,255,0.1)",
                            },
                          }}
                        >
                          <ContentCopy fontSize="small" />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Typography
            variant="body2"
            color="rgba(255,255,255,0.6)"
            sx={{
              mt: 6,
              textAlign: "center",
              fontStyle: "italic",
            }}
          >
            * All offers are valid at the time of page update.
          </Typography>
        </motion.div>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
}
