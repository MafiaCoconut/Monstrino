class ProcessPetSingleUseCase:
    def __init__(
            self,
            uow_factory: UnitOfWorkFactoryInterface[Any, Repositories],
            gender_resolver_svc: GenderResolverService,
            processing_states_svc: CharacterProcessingStatesService,
            image_reference_svc: ImageReferenceService,

    ):
        self.pet_repository = pet_repository
        self.pet_processor = pet_processor


    """
    1. Fetch a single parsed pet by ID 
    2. Create pet entity
    3. Format name
    4. Resolve owner id
    5. Save pet
    6. Set image to processing
    7. Set parsed pet as processed
    """
    def execute(self, pet_id):

        pet = self.pet_repository.get_pet_by_id(pet_id)
        if not pet:
            raise ValueError("Pet not found")

        processed_pet = self.pet_processor.process(pet)
        self.pet_repository.save_processed_pet(processed_pet)
        return processed_pet