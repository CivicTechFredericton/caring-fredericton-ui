import setuptools


with open("README.md") as fp:
    long_description = fp.read()


setuptools.setup(
    name="frontend-ui.static_website",
    version="0.0.1",

    description="The deployment stack for the static web site",
    long_description=long_description,
    long_description_content_type="text/markdown",

    author="Howard Powell",

    package_dir={"": "static_website"},
    packages=setuptools.find_packages(where="static_website"),

    install_requires=[],

    python_requires=">=3.6",

    classifiers=[
        "Development Status :: 4 - Beta",

        "Intended Audience :: Developers",

        "License :: OSI Approved :: Apache Software License",

        "Programming Language :: JavaScript",
        "Programming Language :: Python :: 3 :: Only",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",

        "Topic :: Software Development :: Code Generators",
        "Topic :: Utilities",

        "Typing :: Typed",
    ],
)
