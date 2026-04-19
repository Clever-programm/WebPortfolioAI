import os
from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML
from core.config_parser import PortfolioConfig

def generate_pdf(config: PortfolioConfig, template_dir: str, output_path: str):
    env = Environment(loader=FileSystemLoader(template_dir))
    template = env.get_template('resume.html')
    
    html_out = template.render(config=config)
    
    HTML(string=html_out).write_pdf(output_path)
