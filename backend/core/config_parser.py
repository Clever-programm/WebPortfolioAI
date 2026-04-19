import yaml
from pydantic import BaseModel
from typing import List, Optional

class BaseInfo(BaseModel):
    name: str
    title: str
    about: str

class Contacts(BaseModel):
    email: str
    phone: str
    location: str
    linkedin: Optional[str] = None
    github: Optional[str] = None

class PetProject(BaseModel):
    name: str
    description: str
    technologies: List[str]
    link: Optional[str] = None

class WorkExperience(BaseModel):
    role: str
    company: str
    period: str
    description: str

class Education(BaseModel):
    degree: str
    institution: str
    period: str

class PortfolioConfig(BaseModel):
    base_info: BaseInfo
    contacts: Contacts
    soft_skills: List[str]
    hard_skills: List[str]
    pet_projects: List[PetProject]
    work_experience: List[WorkExperience]
    education: List[Education]

def load_config(file_path: str) -> PortfolioConfig:
    with open(file_path, "r", encoding="utf-8") as f:
        data = yaml.safe_load(f)
    return PortfolioConfig(**data)
