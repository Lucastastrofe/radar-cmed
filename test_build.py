import unittest
from build import price, rate_columns


class CmedBuildTests(unittest.TestCase):
    def test_price_parser_handles_brazilian_values_and_notes(self):
        self.assertEqual(price("1.234,56*"), 1234.56)
        self.assertEqual(price(1234.56), 1234.56)
        self.assertIsNone(price(" - "))

    def test_rate_columns_pair_only_matching_non_alc_rates(self):
        header = ["PF 0%", "PMVG 0 %", "PF 17 %", "PMVG 17 %", "PF 17 % ALC"]
        self.assertEqual(rate_columns(header), {"0": {"pf": 0, "pmvg": 1}, "17": {"pf": 2, "pmvg": 3}})


if __name__ == "__main__":
    unittest.main()
