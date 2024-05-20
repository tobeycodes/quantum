<?php
/*
 * Plugin Name: Quantum
 */

// NOTE: scratch file for WP plugin
namespace Quantum;

use WP_Error;
use WP_REST_Request;
use WP_REST_Server;

function getHomePage()
{
    $pageId = get_option('page_on_front');

    if (!$pageId) {
        return new WP_Error(
            'rest_no_homepage',
            __('No homepage was found.'),
            ['status' => 404]
        );
    }

    return rest_do_request(new WP_REST_Request('GET', '/wp/v2/pages/' . $pageId));
}

function getPostsPage()
{
    $pageId = get_option('page_for_posts');

    if (!$pageId) {
        return new WP_Error(
            'rest_no_posts_page',
            __('No posts page was found.'),
            ['status' => 404]
        );
    }

    return rest_do_request(new WP_REST_Request('GET', '/wp/v2/pages/' . $pageId));
}

function rest_api_init()
{
    register_rest_route("quantum/v1", "homepage", array(
        'methods'   => WP_REST_Server::READABLE,
        'callback'  => 'Quantum\getHomePage'
    ));

    register_rest_route("quantum/v1", "postspage", array(
        'methods'   => WP_REST_Server::READABLE,
        'callback'  => 'Quantum\getPostsPage'
    ));
}

add_action('rest_api_init', 'Quantum\rest_api_init');
