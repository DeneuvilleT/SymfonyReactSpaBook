const Encore = require("@symfony/webpack-encore");

if (!Encore.isRuntimeEnvironmentConfigured()) {
  Encore.configureRuntimeEnvironment(process.env.NODE_ENV || "dev");
}

Encore.setOutputPath("public/build/")
  .setPublicPath("/build")

  .addEntry("app", "./assets/react/index.js")
  .addStyleEntry("styles", [
    "./assets/react/styles.scss",
    "./assets/react/components/Calendar/calendar.styles.scss",
    "./assets/react/components/Form/form.styles.scss",
    "./assets/react/components/FormBook/formBook.styles.scss",
    "./assets/react/components/Logo/logo.styles.scss",
    "./assets/react/components/PageNotFound/notFound.styles.scss",
    "./assets/react/components/PeriodsBooking/periodsBooking.styles.scss",
    "./assets/react/components/Slider/sliderContainer.styles.scss",
    "./assets/react/containers/Footer/footer.styles.scss",
    "./assets/react/containers/Header/header.styles.scss",
    "./assets/react/containers/Home/home.styles.scss",
    "./assets/react/containers/Login/login.styles.scss",
    "./assets/react/containers/Logup/logup.styles.scss",
    "./assets/react/containers/Nav/nav.styles.scss",
    "./assets/react/containers/ProfileBridge/profileBridge.styles.scss",
    "./assets/react/containers/ProfileBridge/UserDatas/userDatas.styles.scss",
    "./assets/react/containers/ProfileBridge/UserBookings/userBookings.styles.scss",
    "./assets/react/containers/Summary/summary.styles.scss",
  ])

  .splitEntryChunks()

  .enableReactPreset()

  .enableSingleRuntimeChunk()

  .cleanupOutputBeforeBuild()
  .enableBuildNotifications()
  .enableSourceMaps(!Encore.isProduction())
  .enableVersioning(Encore.isProduction())

  .configureBabelPresetEnv((config) => {
    config.useBuiltIns = "usage";
    config.corejs = "3.23";
  })

  .enableSassLoader() //enable SCSS file
  .configureCssLoader((options) => {
    options.modules = true;
  })
  .enablePostCssLoader();

module.exports = Encore.getWebpackConfig();
