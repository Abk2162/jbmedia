from PIL import Image, ImageDraw
import numpy as np

# Load original iphone.png
img = Image.open(r"c:\Users\Abhin\Desktop\Abhinav\projects\media_site\design_handoff_jb_media_home\react\public\iphone.png")
# Crop out the right fuzzy shadow so the phone is cleanly isolated (0, 0, 1872, 3862)
phone = img.crop((0, 0, 1872, 3862)).convert("RGBA")
w, h = phone.size

# Create mask for the screen cutout
# Screen bounding box: left=62, top=62, right=1810, bottom=3800
screen_box = (62, 62, 1810, 3800)
corner_radius = 210

# Create an alpha mask where 255 = keep original phone, 0 = make transparent
mask = Image.new("L", (w, h), 255)
draw = ImageDraw.Draw(mask)

# Draw the transparent screen area (black = 0)
draw.rounded_rectangle(screen_box, radius=corner_radius, fill=0)

# But keep the Dynamic Island area (white = 255)
# Dynamic Island is centered at x=936, y=140 to y=280, width=540, height=140
island_box = (666, 138, 1206, 278)
draw.rounded_rectangle(island_box, radius=70, fill=255)

# Apply mask to phone alpha channel
phone_arr = np.array(phone)
mask_arr = np.array(mask)

# Alpha = min(current_alpha, mask_alpha)
phone_arr[:, :, 3] = np.minimum(phone_arr[:, :, 3], mask_arr)

result_img = Image.fromarray(phone_arr, "RGBA")
out_path = r"c:\Users\Abhin\Desktop\Abhinav\projects\media_site\design_handoff_jb_media_home\react\public\iphone-frame-transparent.png"
result_img.save(out_path, "PNG")

print("Generated iphone-frame-transparent.png successfully! Size:", result_img.size)
