<?php if ( NOVA_WOOCOMMERCE_IS_ACTIVE ) : ?>
  <?php if ( is_user_logged_in() ){ ?>
    <div class="handheld_component">
      <a class="component-target" href="<?php echo get_permalink( get_option('woocommerce_myaccount_page_id') ); ?>">
        <svg class="lumilux-user-bar">
         <use xlink:href="#lumilux-user-bar"></use>
        </svg>
    </a>
    </div>
  <?php }else { ?>
  <div class="handheld_component">
    <a class="component-target" data-toggle="AcccountCanvas_Popup">
      <svg class="lumilux-user-bar">
       <use xlink:href="#lumilux-user-bar"></use>
      </svg>
  </a>
  </div>
<?php } ?>
<?php endif; ?>
