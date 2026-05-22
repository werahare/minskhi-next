<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

add_filter('kitify/adobe_fonts/id', 'lumilux_kitify_adobe_fonts_id');
if(!function_exists('lumilux_kitify_adobe_fonts_id')){
    function lumilux_kitify_adobe_fonts_id(){
        return 'aos4iwb';
    }
}

add_filter('kitify/logo/attr/src', 'lumilux_kitify_logo_attr_src');
if(!function_exists('lumilux_kitify_logo_attr_src')){
    function lumilux_kitify_logo_attr_src( $src ){
        $nova_theme = nova_get_theme_options();
        if(!$src && $nova_theme){
	        $src = esc_url( $nova_theme['header_logo']['url'] );
        }
        return $src;
    }
}

add_filter('kitify/logo/attr/src4l', 'lumilux_kitify_logo_attr_src4l');
if(!function_exists('lumilux_kitify_logo_attr_src4l')){
    function lumilux_kitify_logo_attr_src4l( $src ){
        $nova_theme = nova_get_theme_options();
        if(!$src && $nova_theme){
	        $src = esc_url( $nova_theme['header_logo_light']['url'] );
        }
        return $src;
    }
}

add_filter('kitify/logo/attr/width', 'lumilux_kitify_logo_attr_width');
if(!function_exists('lumilux_kitify_logo_attr_width')){
    function lumilux_kitify_logo_attr_width( $value ){
        if(!$value){
            $value = esc_html( nova_get_option('header_logo_width') );
        }
        return $value;
    }
}

add_action('elementor/frontend/widget/before_render', 'lumilux_kitify_add_class_into_sidebar_widget');
if(!function_exists('lumilux_kitify_add_class_into_sidebar_widget')){
    function lumilux_kitify_add_class_into_sidebar_widget( $widget ){
        if('sidebar' == $widget->get_name()){
            $widget->add_render_attribute('_wrapper', 'class' , 'widget-area');
        }

    }
}
add_filter('kitify/nova-menu/control/style', 'lumilux_kitify_add_nova_menu_style');
if(!function_exists('lumilux_kitify_add_nova_menu_style')){
    function lumilux_kitify_add_nova_menu_style(){
        return [
          'default' => esc_html__( 'Default', 'lumilux' ),
          'top-line' => esc_html__( 'Top Line', 'lumilux' ),
          'bottom-line' => esc_html__( 'Bottom Line', 'lumilux' ),
        ];
    }
}
add_filter('kitify/nova-menu-cart/control/preset', 'lumilux_kitify_add_nova_cart_style');
if(!function_exists('lumilux_kitify_add_nova_cart_style')){
    function lumilux_kitify_add_nova_cart_style(){
        return [
          'default' => esc_html__( 'Default', 'lumilux' ),
        ];
    }
}
add_filter('kitify/banner/control/simple_style', 'lumilux_kitify_add_simple_style');
if(!function_exists('lumilux_kitify_add_simple_style')){
    function lumilux_kitify_add_simple_style(){
        return [
          'none' => esc_html__( 'None', 'lumilux' ),
          'cat' => esc_html__( 'Category', 'lumilux' ),
        ];
    }
}

add_filter('kitify/banner-list/preset_overlay', 'lumilux_kitify_banner_list_overlay_preset');
if(!function_exists('lumilux_kitify_banner_list_overlay_preset')){
    function lumilux_kitify_banner_list_overlay_preset(){
        return [
          'default' => esc_html__( 'Default', 'lumilux' ),
        ];
    }
}
add_filter('kitify/advanced_carousel/control/item_layout', 'lumilux_kitify_add_advanced_carousel_item_layout');
if(!function_exists('lumilux_kitify_add_advanced_carousel_item_layout')){
    function lumilux_kitify_add_advanced_carousel_item_layout(){
        return [
          'banners'   => esc_html__( 'Banners', 'lumilux' ),
          'simple'   => esc_html__( 'Simple', 'lumilux' ),
          'category'   => esc_html__( 'Category', 'lumilux' ),
        ];
    }
}

add_filter('kitify/products/control/grid_style', 'lumilux_kitify_add_product_grid_style');
if(!function_exists('lumilux_kitify_add_product_grid_style')){
    function lumilux_kitify_add_product_grid_style(){
        return [
            '1' => esc_html__('Default', 'lumilux'),
        ];
    }
}

add_filter('kitify/products/control/list_style', 'lumilux_kitify_add_product_list_style');
if(!function_exists('lumilux_kitify_add_product_list_style')){
    function lumilux_kitify_add_product_list_style(){
        return [
            '1' => esc_html__('Type 1', 'lumilux'),
            'mini' => esc_html__('Mini', 'lumilux'),
        ];
    }
}
add_filter('kitify/woo-categories/control/preset', 'lumilux_kitify_add_woo_categories_style');
if(!function_exists('lumilux_kitify_add_woo_categories_style')){
    function lumilux_kitify_add_woo_categories_style(){
        return [
          'default' => esc_html__( 'Default', 'lumilux' ),
          'lumilux-01' => esc_html__( 'Lumilux 01', 'lumilux' ),
          'lumilux-02' => esc_html__( 'Lumilux 02', 'lumilux' ),
          'lumilux-03' => esc_html__( 'Lumilux 03', 'lumilux' ),
        ];
    }
}
add_filter('kitify/posts/control/preset', 'lumilux_kitify_add_posts_preset');
if(!function_exists('lumilux_kitify_add_posts_preset')){
    function lumilux_kitify_add_posts_preset(){
        return [
          ' grid-1' => esc_html__( 'Grid 1', 'lumilux' ),
            'grid-2' => esc_html__( 'Grid 2', 'lumilux' ),
            'list-1' => esc_html__( 'List 1', 'lumilux' ),
            'list-2' => esc_html__( 'List 2', 'lumilux' ),
        ];
    }
}

add_filter('kitify/tabs/control/preset', 'lumilux_kitify_add_tabs_preset');
if(!function_exists('lumilux_kitify_add_tabs_preset')){
    function lumilux_kitify_add_tabs_preset(){
        return [
          'default' => esc_html__( 'Default', 'lumilux' ),
          'lumilux-01' => esc_html__( 'Lumilux 01', 'lumilux' ),
        ];
    }
}
add_filter('kitify/testimonials/control/preset', 'lumilux_kitify_add_testimonials_preset');
if(!function_exists('lumilux_kitify_add_testimonials_preset')){
    function lumilux_kitify_add_testimonials_preset(){
        return [
          'type-1' => esc_html__( 'Default', 'lumilux' ),
          'product' => esc_html__( 'Product Testimonials', 'lumilux' ),
        ];
    }
}
add_filter('kitify/products/box_selector', 'lumilux_kitify_product_change_box_selector');
if(!function_exists('lumilux_kitify_product_change_box_selector')){
    function lumilux_kitify_product_change_box_selector(){
        return '{{WRAPPER}} ul.products .product-item';
    }
}

add_filter('kitify/posts/format-icon', 'lumilux_kitify_change_postformat_icon', 10, 2);
if(!function_exists('lumilux_kitify_change_postformat_icon')){
    function lumilux_kitify_change_postformat_icon( $icon, $type ){
        return $icon;
    }
}
add_filter('kitify/wootabs/layout/tabs_layout', 'lumilux_kitify_tabs_layout');
if(!function_exists('lumilux_kitify_tabs_layout')){
    function lumilux_kitify_tabs_layout(){
        return [
            'default' => esc_html__('Default', 'lumilux'),
            'tab_left' => esc_html__('Tabs left', 'lumilux'),
            'accordion' => esc_html__('Accordion', 'lumilux'),
        ];
    }
}
add_filter('kitify/banner/control/animation_effect', 'lumilux_kitify_animation_effect');
if(!function_exists('lumilux_kitify_animation_effect')){
    function lumilux_kitify_animation_effect(){
        return [
            'none'   => esc_html__( 'None', 'lumilux' ),
            'hidden-content'   => esc_html__( 'Hidden Content', 'lumilux' ),
            'lumilux'   => esc_html__( 'Lumilux Style', 'lumilux' ),
        ];
    }
}
add_filter('kitify/team-member/control/preset', 'lumilux_kitify_team_preset');
if(!function_exists('lumilux_kitify_team_preset')){
    function lumilux_kitify_team_preset(){
        return [
            'type-1' => esc_html__( 'Type 1', 'lumilux' ),
            'type-2' => esc_html__( 'Type 2', 'lumilux' ),
            'type-3' => esc_html__( 'Type 3', 'lumilux' ),
            'type-4' => esc_html__( 'Type 4', 'lumilux' ),
            'type-5' => esc_html__( 'Type 5', 'lumilux' ),
        ];
    }
}
// -----------------------------------------------------------------------------
// Elementor register breakpoint
// -----------------------------------------------------------------------------

if ( ! function_exists( 'lumilux_register_breakpoint' ) ) :
function lumilux_register_breakpoint(){
  if(defined('ELEMENTOR_VERSION')){
      $has_register_breakpoint = get_option('lumilux_has_register_breakpoint', false);
      if(empty($has_register_breakpoint)){
          update_option('elementor_experiment-additional_custom_breakpoints', 'active');
          update_option('elementor_experiment-container', 'active');
          update_option('elementor_experiment-e_swiper_latest', 'inactive');
          $kit_active_id = Elementor\Plugin::$instance->kits_manager->get_active_id();
          $raw_kit_settings = get_post_meta( $kit_active_id, '_elementor_page_settings', true );
          if(empty($raw_kit_settings)){
            $raw_kit_settings = [];
          }
          $default_settings = [
              'space_between_widgets' => '0',
              'page_title_selector' => 'h1.entry-title',
              'stretched_section_container' => '',
              'active_breakpoints' => [
                  'viewport_mobile',
                  'viewport_mobile_extra',
                  'viewport_tablet',
                  'viewport_tablet_extra',
                  'viewport_laptop',
              ],
              'viewport_mobile' => 767,
              'viewport_md' => 768,
              'viewport_mobile_extra' => 991,
              'viewport_tablet' => 1024,
              'viewport_tablet_extra' => 1279,
              'viewport_lg' => 1280,
              'viewport_laptop' => 1599,
              'system_colors' => [
                [
                  '_id' => 'primary',
                  'title' => esc_html__( 'Primary', 'lumilux' )
                ],
                [
                  '_id' => 'secondary',
                  'title' => esc_html__( 'Secondary', 'lumilux' )
                ],
                [
                  '_id' => 'text',
                  'title' => esc_html__( 'Text', 'lumilux' )
                ],
                [
                  '_id' => 'accent',
                  'title' => esc_html__( 'Accent', 'lumilux' )
                ]
              ],
              'system_typography' => [
                [
                  '_id' => 'primary',
                  'title' => esc_html__( 'Primary', 'lumilux' )
                ],
                [
                  '_id' => 'secondary',
                  'title' => esc_html__( 'Secondary', 'lumilux' )
                ],
                [
                  '_id' => 'text',
                  'title' => esc_html__( 'Text', 'lumilux' )
                ],
                [
                  '_id' => 'accent',
                  'title' => esc_html__( 'Accent', 'lumilux' )
                ]
              ]
          ];
          $raw_kit_settings = array_merge($raw_kit_settings, $default_settings);
          update_post_meta( $kit_active_id, '_elementor_page_settings', $raw_kit_settings );
          Elementor\Core\Breakpoints\Manager::compile_stylesheet_templates();
          update_option('lumilux_has_register_breakpoint', true);
      }
  }
}
endif;
add_action( 'elementor/init', 'lumilux_register_breakpoint' );

/**
 * Add support for Elementor Pro locations
 *
 * @since 1.0.0
 */
if ( ! function_exists( 'lumilux_register_elementor_locations' ) ) :
  function lumilux_register_elementor_locations( $elementor_theme_manager ) {
      $elementor_theme_manager->register_all_core_location();
  }
endif;
// Add support for Elementor Pro locations
add_action( 'elementor/theme/register_locations', 'lumilux_register_elementor_locations' );
