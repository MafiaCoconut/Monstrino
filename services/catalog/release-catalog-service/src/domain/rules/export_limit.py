class ExportLimitRule:
    @staticmethod
    def is_within_limit(self, count: int) -> bool:
        return 1 <= count <= 100