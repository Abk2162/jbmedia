import re
import os

input_path = r"c:\Users\Abhin\Desktop\Abhinav\projects\media_site\design_handoff_jb_media_home\react\public\raw_svg.txt"
output_path = r"c:\Users\Abhin\Desktop\Abhinav\projects\media_site\design_handoff_jb_media_home\react\public\iphone-15-pro-frame.svg"

with open(input_path, "r", encoding="utf-8") as f:
    svg_data = f.read()

match = re.search(r"(<svg .*?</svg>)", svg_data, re.DOTALL)
if match:
    full_svg = match.group(1)
    
    # 1. Remove the pattern2 rect
    cleaned_svg = re.sub(r'<rect [^>]*fill="url\(#pattern2_0_1\)"[^>]*/>', '', full_svg)
    # 2. Remove the pattern2 definition
    cleaned_svg = re.sub(r'<pattern id="pattern2_0_1".*?</pattern>', '', cleaned_svg, flags=re.DOTALL)
    # 3. Remove image2_0_1
    cleaned_svg = re.sub(r'<image id="image2_0_1".*?/>', '', cleaned_svg, flags=re.DOTALL)

    with open(output_path, "w", encoding="utf-8") as out:
        out.write(cleaned_svg)
    print("Successfully generated:", output_path, "Size:", len(cleaned_svg))
else:
    print("No SVG tag found.")
