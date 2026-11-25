"""Build the one-page, ATS-readable portfolio résumé."""

from pathlib import Path
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'resume' / 'Aakash_P_Product_Designer_Resume.pdf'
FONTS = ROOT / 'resume' / 'fonts'
for name in ('InstrumentSans-Regular', 'GoogleSans-Regular', 'GoogleSans-Semibold'):
    pdfmetrics.registerFont(TTFont(name, str(FONTS / (name + '.ttf'))))

W, H = A4
LEFT, RIGHT = 43, W - 43
INK, SOFT, LINE = HexColor('#222522'), HexColor('#555b55'), HexColor('#cbd0ca')
c = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
c.setTitle('Aakash P - Product Designer Resume')
c.setAuthor('Aakash P')
c.setSubject('Product Designer and UI/UX Designer résumé')


def text(value, x, y, font='GoogleSans-Regular', size=9.3, color=INK):
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawString(x, y, value)


def wrap(value, width, font, size):
    lines, current = [], ''
    for word in value.split():
        candidate = (current + ' ' + word).strip()
        if current and pdfmetrics.stringWidth(candidate, font, size) > width:
            lines.append(current)
            current = word
        else:
            current = candidate
    if current:
        lines.append(current)
    return lines


def paragraph(value, x, y, width=RIGHT-LEFT, size=9.3, leading=13.5, font='GoogleSans-Regular', color=SOFT):
    for line in wrap(value, width, font, size):
        text(line, x, y, font, size, color)
        y -= leading
    return y


def section(title, y):
    text(title, LEFT, y, 'GoogleSans-Semibold', 9.2)
    start = LEFT + pdfmetrics.stringWidth(title, 'GoogleSans-Semibold', 9.2) + 18
    c.setStrokeColor(LINE)
    c.setLineWidth(.6)
    c.line(start, y + 2.5, RIGHT, y + 2.5)
    return y - 23


def job(company, dates, role, bullets, y):
    text(company, LEFT, y, 'GoogleSans-Semibold', 9.9)
    c.setFont('GoogleSans-Regular', 8.9)
    c.setFillColor(SOFT)
    c.drawRightString(RIGHT, y, dates)
    y -= 14.5
    text(role, LEFT, y, size=8.9, color=SOFT)
    y -= 16
    for bullet in bullets:
        text('•', LEFT + 1, y, size=9.0, color=SOFT)
        y = paragraph(bullet, LEFT + 17, y, RIGHT-LEFT-17, size=8.9, leading=12.7)
        y -= 3.3
    return y - 5


def project(name, category, description, y, link=None):
    title = name + '  |  ' + category
    text(title, LEFT, y, 'GoogleSans-Semibold', 9.25)
    if link:
        c.linkURL(link, (LEFT, y-2, LEFT+pdfmetrics.stringWidth(title, 'GoogleSans-Semibold', 9.25), y+11), relative=0)
    y = paragraph(description, LEFT, y-13.5, size=8.75, leading=12.2)
    return y - 5.8


y = H - 45
text('Aakash P', LEFT, y, 'InstrumentSans-Regular', 29)
y -= 24
text('PRODUCT DESIGNER  /  UI/UX DESIGNER', LEFT, y, 'GoogleSans-Semibold', 9.6, SOFT)
y -= 20
contact = 'Coimbatore, India   |   +91 63816 59522   |   aakashh.contact@gmail.com'
text(contact, LEFT, y, size=9.0, color=SOFT)
c.linkURL('mailto:aakashh.contact@gmail.com', (LEFT+313, y-2, RIGHT, y+11), relative=0)
y -= 18
text('Portfolio', LEFT, y, size=9.1)
text('LinkedIn', LEFT+75, y, size=9.1)
c.linkURL('https://aakash1325.github.io/aakash-portfolio/', (LEFT, y-2, LEFT+52, y+11), relative=0)
c.linkURL('https://www.linkedin.com/in/designeraakash01/', (LEFT+75, y-2, LEFT+126, y+11), relative=0)
y -= 23

y = section('PROFILE', y)
y = paragraph('Product Designer creating responsive websites and clear B2B product interfaces. Designed the live FITTEX website, contributed to its established ERP, co-designed Kamblis and Toodhu, and owned NutaLink’s UI/UX design and frontend implementation. I connect product thinking, Figma systems, prototypes, and practical frontend work.', LEFT, y, size=9.15, leading=13.15)
y -= 17

y = section('EXPERIENCE', y)
y = job('Jeevan Infotech India Pvt. Ltd.', 'Jul 2026 - Present', 'Junior Designer', [
    'Designed the live FITTEX website and selected new and redesigned screens in its existing apparel ERP.',
    'Co-designed Kamblis and Toodhu, contributing individual and shared interface work.',
    'Owned NutaLink’s UI/UX design, interactive prototypes, and responsive frontend implementation for a company project in testing.'
], y)
y = job('Vidmagin Innovations Pvt. Ltd.', 'Nov 2025 - Feb 2026', 'UI/UX Designer', [
    'Designed responsive website layouts and organized product information into clear page structures.',
    'Created supporting posters, presentations, and digital graphics.'
], y)
y = job('E-Sutra Technologies Pvt. Ltd.', 'Jul 2025 - Nov 2025', 'UI/UX Designer Intern', [
    'Contributed to web and app interfaces, user flows, wireframes, Figma prototypes, and developer collaboration.'
], y)
y -= 5

y = section('SELECTED PROJECTS', y)
y = project('FITTEX', 'Apparel ERP & Website', 'Designed the public website; contributed selected new and redesigned ERP interfaces.', y)
y = project('FlyingRoots', 'Agro-food Website Concept', 'Developed a responsive trade concept with a searchable seven-category catalogue and buyer/supplier enquiry previews; company details are fictional.', y, 'https://aakash1325.github.io/flyingroots/')
y = project('Kamblis', 'B2B Marketplace', 'Co-designed product and member discovery for the uniforms and linens industry.', y)
y = project('NutaLink', 'Agricultural B2B Platform', 'Sole UI/UX designer and frontend implementer; company project in testing.', y)
y = project('Toodhu', 'Business Software', 'Contributed individual and shared interface design with a fellow designer.', y)
y -= 8

y = section('SKILLS & DELIVERY', y)
for label, value in [
    ('Product design', 'UI/UX design, interaction design, user flows, information architecture, wireframing, prototyping'),
    ('Systems & delivery', 'Figma, components, variants, responsive UI, visual hierarchy, developer handoff'),
    ('Frontend & visual', 'HTML, CSS, JavaScript, AI-assisted design workflows, visual design')
]:
    text(label + ':', LEFT, y, 'GoogleSans-Semibold', 8.8)
    x = LEFT + pdfmetrics.stringWidth(label + ':', 'GoogleSans-Semibold', 8.8) + 6
    text(value, x, y, size=8.6, color=SOFT)
    y -= 14.2
y -= 13

y = section('EDUCATION & TRAINING', y)
text('Bachelor of Computer Applications (BCA)', LEFT, y, 'GoogleSans-Semibold', 8.8)
text('KG College of Arts and Science, Coimbatore', LEFT+239, y, size=8.7, color=SOFT)
y -= 15
text('UI/UX Design Professional Course', LEFT, y, 'GoogleSans-Semibold', 8.8)
text('FITA Academy', LEFT+239, y, size=8.7, color=SOFT)
if y < 49:
    raise RuntimeError(f'Resume overflows the page: bottom baseline {y:.1f} pt')
c.showPage()
c.save()
print(f'Built résumé, bottom baseline {y:.1f} pt: {OUT}')
