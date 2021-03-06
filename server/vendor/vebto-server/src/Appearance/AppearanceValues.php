<?php namespace Vebto\Appearance;

use Vebto\Settings\DotEnvEditor;
use GuzzleHttp\Client;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Filesystem\FilesystemManager;

class AppearanceValues
{
    /**
     * @var Filesystem
     */
    private $fs;

    /**
     * @var FilesystemManager
     */
    private $storage;

    /**
     * Path to custom css theme.
     */
    const THEME_PATH = 'resources/editable-theme.css';

    /**
     * Path to stored user selected values for css theme.
     */
    const THEME_VALUES_PATH = 'appearance/theme-values.json';

    /**
     * ENV values to include.
     */
    const ENV_KEYS = ['app_url', 'app_name'];

    /**
     * @var Client
     */
    private $http;

    /**
     * AppearanceManager constructor.
     *
     * @param Filesystem $fs
     * @param FilesystemManager $storage
     * @param Client $http
     */
    public function __construct(
        Filesystem $fs,
        FilesystemManager $storage,
        Client $http
    )
    {
        $this->fs = $fs;
        $this->storage = $storage;
        $this->http = $http;
    }

    /**
     * Get user defined and default values for appearance editor.
     *
     * @return array
     */
    public function get()
    {
        //get default settings for the application
        $settings = config('vebto.default-settings');

        list($theme, $variables) = $this->getCssThemeAndVariables();

        //merge default theme values with user selected values
        if ($this->storage->disk('public')->exists(self::THEME_VALUES_PATH)) {
            $variables = array_replace_recursive(
                $variables,
                json_decode($this->storage->disk('public')->get(self::THEME_VALUES_PATH), true)
            );
        }

        //add css theme to settings array
        $settings[] = ['name' => 'editable_theme', 'value' => $theme];

        //add env settings
        $env = [];
        foreach (self::ENV_KEYS as $key) {
            $env['env.'.$key] = config(str_replace('_', '.', $key));
        }
        $settings[] = ['name' => 'env', 'value' => $env];

        $settings[] = ['name' => 'colors', 'value' => $variables];

        return array_values($settings);
    }

    /**
     * Get css theme and default variables for appearance editor.
     *
     * @return array
     */
    private function getCssThemeAndVariables()
    {
        $theme = $this->fs->get(base_path(self::THEME_PATH));

        //capture and remove css variables defined in :root
        preg_match('/:root {(.+?)}/s', $theme, $matches);
        $theme = trim(preg_replace('/:root {(.+?)}/s', '', $theme));

        //transform css variables into dot notation keys
        $theme = preg_replace_callback('/var\(--(.+?)\)/', function ($matches) {
            return str_replace('-', '.', $matches[1]);
        }, $theme);

        $lines = explode(PHP_EOL, trim($matches[1]));

        //transform css variables into key => value pairs
        $variables = array_map(function ($line) {
            $pair = explode(':', $line);
            $key = trim(str_replace(['--', '-'], ['', '.'], $pair[0]));
            $value = str_replace(';', '', trim($pair[1]));
            $displayName = str_replace('.', ' ', $key);

            return ['name' => $key, 'display_name' => $this->makeColorDisplayName($key), 'value' => $value];
        }, $lines);

        return [$theme, $variables];
    }

    /**
     * Get display name for specified color key.
     * "site.colors.bg-100" to "Background Color 100"
     */
    private function makeColorDisplayName($key) {
        $key = preg_replace("/site.text.color.([0-9]+)/", "Text Color $1", $key);
        $key = preg_replace("/site.border.color.([0-9]+)/", "Border Color $1", $key);
        $key = preg_replace("/site.bg.color.([0-9]+)/", "Background Color $1", $key);
        $key = preg_replace("/site.accent.color/", "Accent Color", $key);
        $key = preg_replace("/site.primary.color.([0-9]+)/", "Primary Color $1", $key);
        return $key;
    }
}