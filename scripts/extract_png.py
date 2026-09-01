import re
import base64
import os

input_path = r"c:\Users\Abhin\Desktop\Abhinav\projects\media_site\design_handoff_jb_media_home\react\public\raw_svg.txt"

with open(input_path, "r", encoding="utf-8") as f:
    text = f.read()

# Extract image0_0_1 (shadow) and image1_0_1 (frame)
# Find xlink:href="data:image/png;base64,..." for image1_0_1
pos1 = text.find('id="image1_0_1"')
if pos1 != -1:
    match1 = re.search(r'xlink:href="data:image/png;base64,([A-Za-z0-9+/=]+)"', text[pos1:pos1+2000000])
    if match1:
        b64_data1 = match1.group(1)
        png_bytes1 = base64.b64decode(b64_data1)
        out1 = r"c:\Users\Abhin\Desktop\Abhinav\projects\media_site\design_handoff_jb_media_home\react\public\iphone-15-pro-frame.png"
        with open(out1, "wb") as f_out:
            f_out.write(png_bytes1)
        print(f"Extracted image1_0_1 to {out1}, size: {len(png_bytes1)} bytes")
    else:
        print("image1_0_1 base64 match not found (might be truncated at end)")
        # let's find up to what's available
        raw_b64 = text[pos1:]
        m_start = raw_b64.find('xlink:href="data:image/png;base64,')
        if m_start != -1:
            start_idx = m_start + len('xlink:href="data:image/png;base64,')
            end_idx = raw_b64.find('"', start_idx)
            if end_idx == -1:
                end_idx = raw_b64.find('<', start_idx) # if truncated
            b64_sub = raw_b64[start_idx:end_idx].strip()
            print("Extracted partial/full b64 length:", len(b64_sub))
            # Pad base64 if needed
            padded = b64_sub + '=' * ((4 - len(b64_sub) % 4) % 4)
            try:
                png_bytes = base64.b64decode(padded)
                out_p = r"c:\Users\Abhin\Desktop\Abhinav\projects\media_site\design_handoff_jb_media_home\react\public\iphone-15-pro-frame.png"
                with open(out_p, "wb") as f_out:
                    f_out.write(png_bytes)
                print(f"Saved partial/recovered PNG to {out_p}, size: {len(png_bytes)} bytes")
            except Exception as e:
                print("Decode error:", e)
