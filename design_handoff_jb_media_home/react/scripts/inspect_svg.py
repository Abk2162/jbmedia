import re

input_path = r"c:\Users\Abhin\Desktop\Abhinav\projects\media_site\design_handoff_jb_media_home\react\public\raw_svg.txt"

with open(input_path, "r", encoding="utf-8") as f:
    text = f.read()

images = re.findall(r'<image id="([^"]+)"', text)
print("Found image IDs:", images)
for img_id in images:
    pos = text.find(f'id="{img_id}"')
    print(f"Image {img_id} starts at {pos}, preview: {text[pos:pos+150]}")
