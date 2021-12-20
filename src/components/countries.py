from __future__ import unicode_literals
# https://countrycode.org/


def default_city_dict():
    return {'name': 'Gotham City', 'country': 'us'}


def get_country_code(country_name):
    for cc in country_codes:
        if cc['country'].lower() == country_name.lower():
            return cc['code']

    return None


def get_country_name(country_code):
    for cc in country_codes:
        if cc['code'] == country_code.lower():
            return cc['country']

    return None


country_codes = [
    {'country': 'Afghanistan', 'code': 'af'},
    {'country': 'Albania', 'code': 'al'},
    {'country': 'Algeria', 'code': 'dz'},
    {'country': 'American Samoa', 'code': 'as'},
    {'country': 'Andorra', 'code': 'ad'},
    {'country': 'Angola', 'code': 'ao'},
    {'country': 'Anguilla', 'code': 'ai'},
    {'country': 'Antarctica', 'code': 'aq'},
    {'country': 'Antigua and Barbuda', 'code': 'ag'},
    {'country': 'Argentina', 'code': 'ar'},
    {'country': 'Armenia', 'code': 'am'},
    {'country': 'Aruba', 'code': 'aw'},
    {'country': 'Australia', 'code': 'au'},
    {'country': 'Austria', 'code': 'at'},
    {'country': 'Azerbaijan', 'code': 'az'},
    {'country': 'Bahamas', 'code': 'bs'},
    {'country': 'Bahrain', 'code': 'bh'},
    {'country': 'Bangladesh', 'code': 'bd'},
    {'country': 'Barbados', 'code': 'bb'},
    {'country': 'Belarus', 'code': 'by'},
    {'country': 'Belgium', 'code': 'be'},
    {'country': 'Belize', 'code': 'bz'},
    {'country': 'Benin', 'code': 'bj'},
    {'country': 'Bermuda', 'code': 'bm'},
    {'country': 'Bhutan', 'code': 'bt'},
    {'country': 'Bolivia', 'code': 'bo'},
    {'country': 'Bosnia and Herzegovina', 'code': 'ba'},
    {'country': 'Botswana', 'code': 'bw'},
    {'country': 'Brazil', 'code': 'br'},
    {'country': 'British Indian Ocean Territory', 'code': 'io'},
    {'country': 'British Virgin Islands', 'code': 'vg'},
    {'country': 'Brunei', 'code': 'bn'},
    {'country': 'Bulgaria', 'code': 'bg'},
    {'country': 'Burkina Faso', 'code': 'bf'},
    {'country': 'Burundi', 'code': 'bi'},
    {'country': 'Cambodia', 'code': 'kh'},
    {'country': 'Cameroon', 'code': 'cm'},
    {'country': 'Canada', 'code': 'ca'},
    {'country': 'Canary Islands (Spain)', 'code': 'es'},
    {'country': 'Cape Verde', 'code': 'cv'},
    {'country': 'Cayman Islands', 'code': 'ky'},
    {'country': 'Central African Republic', 'code': 'cf'},
    {'country': 'Chad', 'code': 'td'},
    {'country': 'Chile', 'code': 'cl'},
    {'country': 'China', 'code': 'cn'},
    {'country': 'Christmas Island', 'code': 'cx'},
    {'country': 'Cocos Islands', 'code': 'cc'},
    {'country': 'Colombia', 'code': 'co'},
    {'country': 'Comoros', 'code': 'km'},
    {'country': 'Cook Islands', 'code': 'ck'},
    {'country': 'Costa Rica', 'code': 'cr'},
    {'country': 'Croatia', 'code': 'hr'},
    {'country': 'Cuba', 'code': 'cu'},
    {'country': 'Curacao', 'code': 'cw'},
    {'country': 'Cyprus', 'code': 'cy'},
    {'country': 'Czech Republic', 'code': 'cz'},
    {'country': 'Democratic Republic of the Congo', 'code': 'cd'},
    {'country': 'Denmark', 'code': 'dk'},
    {'country': 'Djibouti', 'code': 'dj'},
    {'country': 'Dominica', 'code': 'dm'},
    {'country': 'Dominican Republic', 'code': 'do'},
    {'country': 'East Timor', 'code': 'tl'},
    {'country': 'Ecuador', 'code': 'ec'},
    {'country': 'Egypt', 'code': 'eg'},
    {'country': 'El Salvador', 'code': 'sv'},
    {'country': 'Equatorial Guinea', 'code': 'gq'},
    {'country': 'Eritrea', 'code': 'er'},
    {'country': 'Estonia', 'code': 'ee'},
    {'country': 'Ethiopia', 'code': 'et'},
    {'country': 'Falkland Islands', 'code': 'fk'},
    {'country': 'Faroe Islands', 'code': 'fo'},
    {'country': 'Fiji', 'code': 'fj'},
    {'country': 'Finland', 'code': 'fi'},
    {'country': 'France', 'code': 'fr'},
    {'country': 'French Polynesia', 'code': 'pf'},
    {'country': 'Gabon', 'code': 'ga'},
    {'country': 'Gambia', 'code': 'gm'},
    {'country': 'Georgia', 'code': 'ge'},
    {'country': 'Germany', 'code': 'de'},
    {'country': 'Ghana', 'code': 'gh'},
    {'country': 'Gibraltar', 'code': 'gi'},
    {'country': 'Greece', 'code': 'gr'},
    {'country': 'Greenland', 'code': 'gl'},
    {'country': 'Grenada', 'code': 'gd'},
    {'country': 'Guam', 'code': 'gu'},
    {'country': 'Guadeloupe', 'code': 'gp'},
    {'country': 'Guatemala', 'code': 'gt'},
    {'country': 'Guernsey', 'code': 'gg'},
    {'country': 'Guinea', 'code': 'gn'},
    {'country': 'Guinea-Bissau', 'code': 'gw'},
    {'country': 'Guyana', 'code': 'gy'},
    {'country': 'Haiti', 'code': 'ht'},
    {'country': 'Honduras', 'code': 'hn'},
    {'country': 'Hong Kong', 'code': 'hk'},
    {'country': 'Hungary', 'code': 'hu'},
    {'country': 'Iceland', 'code': 'is'},
    {'country': 'India', 'code': 'in'},
    {'country': 'Indonesia', 'code': 'id'},
    {'country': 'Iran', 'code': 'ir'},
    {'country': 'Iraq', 'code': 'iq'},
    {'country': 'Ireland', 'code': 'ie'},
    {'country': 'Isle of Man', 'code': 'im'},
    {'country': 'Israel', 'code': 'il'},
    {'country': 'Italy', 'code': 'it'},
    {'country': 'Ivory Coast', 'code': 'ci'},
    {'country': 'Jamaica', 'code': 'jm'},
    {'country': 'Japan', 'code': 'jp'},
    {'country': 'Jersey', 'code': 'je'},
    {'country': 'Jordan', 'code': 'jo'},
    {'country': 'Kazakhstan', 'code': 'kz'},
    {'country': 'Kenya', 'code': 'ke'},
    {'country': 'Kiribati', 'code': 'ki'},
    {'country': 'Kosovo', 'code': 'xk'},
    {'country': 'Kuwait', 'code': 'kw'},
    {'country': 'Kyrgyzstan', 'code': 'kg'},
    {'country': 'Laos', 'code': 'la'},
    {'country': 'Latvia', 'code': 'lv'},
    {'country': 'Lebanon', 'code': 'lb'},
    {'country': 'Lesotho', 'code': 'ls'},
    {'country': 'Liberia', 'code': 'lr'},
    {'country': 'Libya', 'code': 'ly'},
    {'country': 'Liechtenstein', 'code': 'li'},
    {'country': 'Lithuania', 'code': 'lt'},
    {'country': 'Luxembourg', 'code': 'lu'},
    {'country': 'Macao', 'code': 'mo'},
    {'country': 'Macedonia', 'code': 'mk'},
    {'country': 'Madagascar', 'code': 'mg'},
    {'country': 'Malawi', 'code': 'mw'},
    {'country': 'Malaysia', 'code': 'my'},
    {'country': 'Maldives', 'code': 'mv'},
    {'country': 'Mali', 'code': 'ml'},
    {'country': 'Malta', 'code': 'mt'},
    {'country': 'Marshall Islands', 'code': 'mh'},
    {'country': 'Mauritania', 'code': 'mr'},
    {'country': 'Mauritius', 'code': 'mu'},
    {'country': 'Mayotte', 'code': 'yt'},
    {'country': 'Mexico', 'code': 'mx'},
    {'country': 'Micronesia', 'code': 'fm'},
    {'country': 'Moldova', 'code': 'md'},
    {'country': 'Monaco', 'code': 'mc'},
    {'country': 'Mongolia', 'code': 'mn'},
    {'country': 'Montenegro', 'code': 'me'},
    {'country': 'Montserrat', 'code': 'ms'},
    {'country': 'Morocco', 'code': 'ma'},
    {'country': 'Mozambique', 'code': 'mz'},
    {'country': 'Myanmar', 'code': 'mm'},
    {'country': 'Namibia', 'code': 'na'},
    {'country': 'Nauru', 'code': 'nr'},
    {'country': 'Nepal', 'code': 'np'},
    {'country': 'Netherlands', 'code': 'nl'},
    {'country': 'Netherlands Antilles', 'code': 'an'},
    {'country': 'New Caledonia', 'code': 'nc'},
    {'country': 'New Zealand', 'code': 'nz'},
    {'country': 'Nicaragua', 'code': 'ni'},
    {'country': 'Niger', 'code': 'ne'},
    {'country': 'Nigeria', 'code': 'ng'},
    {'country': 'Niue', 'code': 'nu'},
    {'country': 'North Korea', 'code': 'kp'},
    {'country': 'Northern Mariana Islands', 'code': 'mp'},
    {'country': 'Norway', 'code': 'no'},
    {'country': 'Oman', 'code': 'om'},
    {'country': 'Pakistan', 'code': 'pk'},
    {'country': 'Palau', 'code': 'pw'},
    {'country': 'Palestine', 'code': 'ps'},
    {'country': 'Panama', 'code': 'pa'},
    {'country': 'Papua New Guinea', 'code': 'pg'},
    {'country': 'Paraguay', 'code': 'py'},
    {'country': 'Peru', 'code': 'pe'},
    {'country': 'Philippines', 'code': 'ph'},
    {'country': 'Pitcairn', 'code': 'pn'},
    {'country': 'Poland', 'code': 'pl'},
    {'country': 'Portugal', 'code': 'pt'},
    {'country': 'Puerto Rico', 'code': 'pr'},
    {'country': 'Qatar', 'code': 'qa'},
    {'country': 'Republic of the Congo', 'code': 'cg'},
    {'country': 'Reunion', 'code': 're'},
    {'country': 'Romania', 'code': 'ro'},
    {'country': 'Russia', 'code': 'ru'},
    {'country': 'Rwanda', 'code': 'rw'},
    {'country': 'Saint Barthelemy', 'code': 'bl'},
    {'country': 'Saint Helena', 'code': 'sh'},
    {'country': 'Saint Kitts and Nevis', 'code': 'kn'},
    {'country': 'Saint Lucia', 'code': 'lc'},
    {'country': 'Saint Martin', 'code': 'mf'},
    {'country': 'Saint Pierre and Miquelon', 'code': 'pm'},
    {'country': 'Saint Vincent and the Grenadines', 'code': 'vc'},
    {'country': 'Samoa', 'code': 'ws'},
    {'country': 'San Marino', 'code': 'sm'},
    {'country': 'São Tomé and Principe', 'code': 'st'},
    {'country': 'Saudi Arabia', 'code': 'sa'},
    {'country': 'Senegal', 'code': 'sn'},
    {'country': 'Serbia', 'code': 'rs'},
    {'country': 'Seychelles', 'code': 'sc'},
    {'country': 'Sierra Leone', 'code': 'sl'},
    {'country': 'Singapore', 'code': 'sg'},
    {'country': 'Sint Maarten', 'code': 'sx'},
    {'country': 'Slovakia', 'code': 'sk'},
    {'country': 'Slovenia', 'code': 'si'},
    {'country': 'Solomon Islands', 'code': 'sb'},
    {'country': 'Somalia', 'code': 'so'},
    {'country': 'South Africa', 'code': 'za'},
    {'country': 'South Korea', 'code': 'kr'},
    {'country': 'South Sudan', 'code': 'ss'},
    {'country': 'Spain', 'code': 'es'},
    {'country': 'Sri Lanka', 'code': 'lk'},
    {'country': 'Sudan', 'code': 'sd'},
    {'country': 'Suriname', 'code': 'sr'},
    {'country': 'Svalbard and Jan Mayen', 'code': 'sj'},
    {'country': 'Swaziland', 'code': 'sz'},
    {'country': 'Sweden', 'code': 'se'},
    {'country': 'Switzerland', 'code': 'ch'},
    {'country': 'Syria', 'code': 'sy'},
    {'country': 'Taiwan', 'code': 'tw'},
    {'country': 'Tajikistan', 'code': 'tj'},
    {'country': 'Tanzania', 'code': 'tz'},
    {'country': 'Thailand', 'code': 'th'},
    {'country': 'Togo', 'code': 'tg'},
    {'country': 'Tokelau', 'code': 'tk'},
    {'country': 'Tonga', 'code': 'to'},
    {'country': 'Trinidad and Tobago', 'code': 'tt'},
    {'country': 'Tunisia', 'code': 'tn'},
    {'country': 'Turkey', 'code': 'tr'},
    {'country': 'Turkmenistan', 'code': 'tm'},
    {'country': 'Turks and Caicos Islands', 'code': 'tc'},
    {'country': 'Tuvalu', 'code': 'tv'},
    {'country': 'U.S. Virgin Islands', 'code': 'vi'},
    {'country': 'Uganda', 'code': 'ug'},
    {'country': 'Ukraine', 'code': 'ua'},
    {'country': 'United Arab Emirates', 'code': 'ae'},
    {'country': 'United Kingdom', 'code': 'uk'},
    {'country': 'United States', 'code': 'us'},
    {'country': 'Uruguay', 'code': 'uy'},
    {'country': 'Uzbekistan', 'code': 'uz'},
    {'country': 'Vanuatu', 'code': 'vu'},
    {'country': 'Vatican', 'code': 'va'},
    {'country': 'Venezuela', 'code': 've'},
    {'country': 'Vietnam', 'code': 'vn'},
    {'country': 'Wallis and Futuna', 'code': 'wf'},
    {'country': 'Western Sahara', 'code': 'eh'},
    {'country': 'Yemen', 'code': 'ye'},
    {'country': 'Zambia', 'code': 'zm'},
    {'country': 'Zimbabwe', 'code': 'zw'},
]
