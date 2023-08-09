import usePosts from "../../hooks/usePosts";
import FormatPost from "../../components/post/FormatPost";
import LikePost from "../../components/post/LikePost";
import MenuSectionDivider from "../../components/navbar/menu_components/MenuSectionDivider";

const Illustrations = () => {
  const { content } = usePosts("illustrations");

  return (
    <section className="mt-16">
      {content.map((item: any, index: number) => {
        return (
          <div key={index}>
            <MenuSectionDivider />
            <FormatPost post={content[index]} />
            <LikePost post={content[index]} />
          </div>
        );
      })}
    </section>
  );
};

export default Illustrations;
