import os
import yaml
from datetime import datetime
import argparse

def parse_export_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.read().strip().split('\n\n')

    # Remove the leading '#' and split the first line to get title and author
    title_author = lines[0].lstrip('#').strip().split(' by ')
    title = title_author[0].strip()
    author = title_author[1].strip()
    
    # Get the quotes from the remaining lines
    quotes = [quote.strip() for quote in lines[1:]]
    
    return title, author, quotes

def create_md_file(title, author, read_at):
    md_content = f"""---
title: {title}
author: {author}
read_at: {read_at}
---
"""
    file_name = f"{title.replace(' ', '-').lower()}.md"
    with open(file_name, 'w', encoding='utf-8') as f:
        f.write(md_content)

def create_yml_file(title, quotes):
    yml_content = {'quotes': [{'raw': quote} for quote in quotes]}
    file_name = f"{title.replace(' ', '-').lower()}.11tydata.yml"
    with open(file_name, 'w', encoding='utf-8') as f:
        yaml.dump(yml_content, f, default_flow_style=False, allow_unicode=True)

def main(export_file_path):
    read_at = datetime.now().strftime('%Y-%m-%d')
    title, author, quotes = parse_export_file(export_file_path)
    create_md_file(title, author, read_at)
    create_yml_file(title, quotes)
    print(f"Files for '{title}' created successfully!")

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description="Generate .md and .11tydata.yml files from an exported markdown file.")
    parser.add_argument('export_file_path', type=str, help='Path to the exported markdown file')
    args = parser.parse_args()

    main(args.export_file_path)
