import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchData,
  exerciseOptions,
  youtubeOptions,
  exerciseDbBaseUrl,
  youtubeSearchBaseUrl,
} from '../services/fetchData';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';

const DetailSkeleton = () => (
  <section className="mx-auto mt-8 w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
    <div className="grid gap-6 rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-5 sm:p-8 lg:grid-cols-[1.05fr_1fr]">
      <div className="h-[420px] animate-pulse rounded-[1.75rem] border border-white/5 bg-white/[0.03]" />
      <div className="flex flex-col gap-4">
        <div className="h-8 w-2/3 animate-pulse rounded-full bg-white/5" />
        <div className="h-12 w-full animate-pulse rounded-2xl bg-white/5" />
        <div className="grid grid-cols-3 gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl bg-white/5" />
          ))}
        </div>
        <div className="h-40 animate-pulse rounded-2xl bg-white/5" />
      </div>
    </div>
  </section>
);

const ExerciseDetail = () => {
  const { id } = useParams();
  const [exerciseDetail, setExerciseDetail] = useState(null);
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const [detailLoading, setDetailLoading] = useState(true);
  const [videosLoading, setVideosLoading] = useState(true);
  const [similarLoading, setSimilarLoading] = useState(true);

  useEffect(() => {
    const fetchExerciseData = async () => {
      setDetailLoading(true);
      setVideosLoading(true);
      setSimilarLoading(true);

      const detail = await fetchData(`${exerciseDbBaseUrl}/exercises/exercise/${id}`, exerciseOptions);
      setExerciseDetail(detail && !Array.isArray(detail) ? detail : null);
      setDetailLoading(false);

      if (detail?.name) {
        fetchData(
          `${youtubeSearchBaseUrl}/search?query=${encodeURIComponent(`${detail.name} exercise`)}`,
          youtubeOptions
        ).then((videosData) => {
          setExerciseVideos(Array.isArray(videosData?.contents) ? videosData.contents : []);
          setVideosLoading(false);
        });
      } else {
        setVideosLoading(false);
      }

      if (detail?.target && detail?.equipment) {
        Promise.all([
          fetchData(`${exerciseDbBaseUrl}/exercises/target/${detail.target}`, exerciseOptions),
          fetchData(`${exerciseDbBaseUrl}/exercises/equipment/${detail.equipment}`, exerciseOptions),
        ]).then(([targetData, equipmentData]) => {
          setTargetMuscleExercises(Array.isArray(targetData) ? targetData : []);
          setEquipmentExercises(Array.isArray(equipmentData) ? equipmentData : []);
          setSimilarLoading(false);
        });
      } else {
        setSimilarLoading(false);
      }
    };

    if (id) fetchExerciseData();
  }, [id]);

  return (
    <main className="pb-20">
      {detailLoading ? (
        <DetailSkeleton />
      ) : exerciseDetail ? (
        <Detail exercise={exerciseDetail} />
      ) : (
        <section className="mx-auto mt-10 w-full max-w-[1440px] px-4 sm:px-6 lg:px-10">
          <div className="rounded-[2rem] border border-dashed border-white/15 bg-white/[0.02] p-12 text-center">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#d4ff00]">404 // NOT FOUND</p>
            <p className="mt-2 text-lg font-bold text-white/70">Exercise not found.</p>
          </div>
        </section>
      )}

      {!detailLoading && exerciseDetail && (
        <>
          <ExerciseVideos
            videos={exerciseVideos}
            name={exerciseDetail.name}
            loading={videosLoading}
          />
          <SimilarExercises
            targetMuscleExercises={targetMuscleExercises}
            equipmentExercises={equipmentExercises}
            loading={similarLoading}
          />
        </>
      )}
    </main>
  );
};

export default ExerciseDetail;
