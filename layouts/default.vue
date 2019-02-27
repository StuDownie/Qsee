<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <nuxt-link to="/">
            <h1 class="title">Service Point queue manager</h1>
          </nuxt-link>
          <h2 class="subtitle">Desk number</h2>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <nuxt/>
      </div>
    </section>

    <footer class="footer has-background-light">
      <div class="content has-text-centered">
        <p>
          <strong>Qsee v1.0</strong> by Stuart Downie.
        </p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
// Import Bulma's core
@import '~bulma/sass/utilities/_all';

// // Import a Google Font
// @import url('https://fonts.googleapis.com/css?family=Cabin');
// $family-primary: 'Cabin';

// Set your colors
$primary: #653ccb;
$primary-invert: findColorInvert($primary);
// $info: rgb(110, 207, 219);
// $info-invert: findColorInvert($info);
// $success: rgb(133, 231, 166);
// $success-invert: findColorInvert($success);
// $danger: rgb(172, 13, 74);
// $danger-invert: findColorInvert($danger);
// $warning: rgb(214, 228, 19);
// $warning-invert: findColorInvert($warning);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);
$beige-lighter: #eff0eb;

$body-background-color: $light;
// $box-shadow: 0px 10px 40px rgba(56, 56, 56, 0.281);
// $box-radius: 0px;
// $control-radius: 0px; // Buttons

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  'white': (
    $white,
    $black
  ),
  'black': (
    $black,
    $white
  ),
  'light': (
    $light,
    $light-invert
  ),
  'dark': (
    $dark,
    $dark-invert
  ),
  'primary': (
    $primary,
    $primary-invert
  ),
  'info': (
    $info,
    $info-invert
  ),
  'success': (
    $success,
    $success-invert
  ),
  'warning': (
    $warning,
    $warning-invert
  ),
  'danger': (
    $danger,
    $danger-invert
  ),
  'twitter': (
    $twitter,
    $twitter-invert
  )
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import '~bulma';
@import '~buefy/src/scss/buefy';
</style>


<script>
export default {}
</script>
