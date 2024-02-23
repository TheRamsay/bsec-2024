data = """
NVIDIA Corporation,NVDA    US67066G1040    785.38    235.61    1570.76    17.11    -12.11    -9.69
Super Micro Computer Inc,SMCI    US86800U1043    975.52    390.21    1853.49    11.47    -14.36    0.68
Advanced Micro Devices Inc,AMD    US0079031078    181.86    54.56    345.53    19.70    -6.58    1.18
Tesla,TSLA    US88160R1014    197.41    118.45    296.12    18.86    -1.55    -1.45
Microsoft Corp.,MSFT    US5949181045    411.65    288.16    617.48    0.53    -7.87    -0.11
Meta,META    US30303M1027    486.13    340.29    631.97    2.71    0.17    0.53
Amazon,AMZN    US0231351067    174.58    122.21    296.79    6.55    -8.28    -0.73
Apple,AAPL    US0378331005    184.37    18.44    294.99    2.35    -10.05    0.25
Broadcom,AVGO    US11135F1012    1304.90    782.94    2348.82    7.62    -9.60    -0.68
Palo Alto Networks,PANW    US6974351057    267.82    80.35    535.64    7.54    -10.93    1.26
Alphabet Inc (Google) Class C,GOOG    US02079K1079    145.32    14.53    261.58    17.75    -8.40    -1.00
Adobe Inc.,ADBE    US00724F1012    537.57    53.76    591.33    17.55    -9.56    -1.13
Intel Corporation,INTC    US4581401001    42.98    30.09    51.58    12.92    -1.66    -1.08
Eli Lilly and Company,LLY    BBG000BNBDC2    769.64    461.78    1385.35    16.24    -14.30    -0.76
Rivian Automotive Inc.,NFLX    BBG000CL9VN6    588.47    294.24    765.01    12.61    -3.30    -0.95
nazev    id    picovina    price    min    max    positive_case    negative_case    negative_case
"""

# better_data = [row.split(",")[1] for row in data.split("\n") if row]
# print(better_data)
data = data.replace("    ", ",")
print(data)