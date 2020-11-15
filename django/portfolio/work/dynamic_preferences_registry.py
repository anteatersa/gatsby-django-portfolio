from dynamic_preferences.types import BooleanPreference, StringPreference, FilePreference, LongStringPreference, ChoicePreference
from dynamic_preferences.preferences import Section
from dynamic_preferences.registries import global_preferences_registry

general = Section('general')

# Site name
@global_preferences_registry.register
class SiteTitle(StringPreference):
    section = general
    name = 'title'
    verbose_name = "Site title"
    default = 'My site'
    required = True

# Intro text
@global_preferences_registry.register
class IntroText(LongStringPreference):
    section = general
    name = 'intro_text'
    verbose_name = "Intro text"
    default = 'Intro text in here'
    required = True

# Dark Logo
@global_preferences_registry.register
class DarkLogo(FilePreference):
    section = general
    name = 'logo_dark'
    verbose_name = "Logo dark"
    default = ''
    required = False

# Light Logo
@global_preferences_registry.register
class LightLogo(FilePreference):
    section = general
    name = 'logo_light'
    verbose_name = "Logo light"
    default = ''
    required = False

# SVG Logo
@global_preferences_registry.register
class SVGLogo(LongStringPreference):
    section = general
    name = 'svg_logo'
    verbose_name = "SVG Logo"
    default = ''
    required = False

# Body Colour
@global_preferences_registry.register
class BodyColour(StringPreference):
    section = general
    name = 'home_body_colour'
    verbose_name = "Home body colour"
    default = '#FFFFFF'
    required = True

# Body Lght or Dark
@global_preferences_registry.register
class BodyColourShade(ChoicePreference):
    section = general
    name = 'home_light_or_dark'
    verbose_name = "Is home light or dark?"
    choices = [
        ('light', 'Light'),
        ('dark', 'Dark'),
    ]
    default = 'light'
    required = True

# Text Colour
@global_preferences_registry.register
class TextColour(StringPreference):
    section = general
    name = 'home_text_colour'
    verbose_name = "Home text colour"
    default = '#333333'
    required = True

# Header Text Colour
@global_preferences_registry.register
class HeaderColour(StringPreference):
    section = general
    name = 'home_header_text_colour'
    verbose_name = "Home header text colour"
    default = '#333333'
    required = True
